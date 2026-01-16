#!/bin/bash

# @note Script to parse OpenAPI specifications and generate API documentation summaries
# @example ./hapi-servers-apis.sh

set -euo pipefail

# Configuration
APIS_DIR="./static/apis"
OPENAPI_DIR="$APIS_DIR/openapi"
GRPC_DIR="$APIS_DIR/grpc"
OUTPUT_FILE="$APIS_DIR/openapi.json"
MANIFEST_FILE="$APIS_DIR/manifest.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Utility functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check dependencies
check_dependencies() {
    local deps=("yq" "jq" "sha256sum")
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            log_error "Required dependency '$dep' is not installed"
            exit 1
        fi
    done
}

# Convert YAML to JSON using whatever yq variant is installed.
# @note Supports mikefarah/yq v4 (`yq eval -o=json`), python yq (`yq -j`), and legacy yq v3 (`yq r -j`).
yaml_to_json() {
    local file="$1"
    # Try mikefarah/yq v4
    if yq eval -o=json '.' "$file" >/dev/null 2>&1; then
        yq eval -o=json '.' "$file"
        return 0
    fi
    # Try python yq (jq wrapper)
    if yq -j '.' "$file" >/dev/null 2>&1; then
        yq -j '.' "$file"
        return 0
    fi
    # Try legacy mikefarah/yq v3
    if yq r -j "$file" >/dev/null 2>&1; then
        yq r -j "$file"
        return 0
    fi
    return 1
}

# Count endpoints in OpenAPI spec
count_endpoints() {
    local file="$1"
    local extension="${file##*.}"
    
    if [[ "$extension" == "json" ]]; then
        # Count paths and their methods for JSON files
        jq -r '
            .paths // {} | 
            to_entries | 
            map(.value | keys | length) | 
            add // 0
        ' "$file" 2>/dev/null || echo "0"
    else
        # Count paths and their methods for YAML files (convert to JSON first for consistent jq processing)
        if yaml_to_json "$file" | jq -r '
            .paths // {} |
            to_entries |
            map(.value | keys | length) |
            add // 0
        ' 2>/dev/null; then
            true
        else
            echo "0"
        fi
    fi
}

# Parse OpenAPI file and extract metadata
parse_openapi_file() {
    local file="$1"
    local filename=$(basename "$file")
    local extension="${file##*.}"
    
    local title description version endpoints server_url
    
    if [[ "$extension" == "json" ]]; then
        # Parse JSON files with jq
        title=$(jq -r '.info.title // "Unknown"' "$file" 2>/dev/null || echo "Unknown")
        description=$(jq -r '.info.description // ""' "$file" 2>/dev/null || echo "")
        version=$(jq -r '.info.version // "Unknown"' "$file" 2>/dev/null || echo "Unknown")
        server_url=$(jq -r '.servers[0].url // "not-defined-servers"' "$file" 2>/dev/null || echo "not-defined-servers")
    else
        # Parse YAML files with yq
        title=$(yq eval '.info.title // "Unknown"' "$file" 2>/dev/null || echo "Unknown")
        description=$(yq eval '.info.description // ""' "$file" 2>/dev/null || echo "")
        version=$(yq eval '.info.version // "Unknown"' "$file" 2>/dev/null || echo "Unknown")
        server_url=$(yq eval '.servers[0].url // "not-defined-servers"' "$file" 2>/dev/null || echo "not-defined-servers")
    fi
    
    endpoints=$(count_endpoints "$file")
    
    # Generate file metadata
    local file_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo "0")
    local file_hash=$(sha256sum "$file" | cut -d' ' -f1)
    local last_modified=$(stat -f%m "$file" 2>/dev/null || stat -c%Y "$file" 2>/dev/null || echo "0")
    
    # Create JSON object for this API
    jq -n \
        --arg filename "$filename" \
        --arg title "$title" \
        --arg description "$description" \
        --arg version "$version" \
        --argjson endpoints "$endpoints" \
        --arg server_url "$server_url" \
        --arg file_size "$file_size" \
        --arg file_hash "$file_hash" \
        --argjson last_modified "$last_modified" \
        --arg format "$extension" \
        '{
            filename: $filename,
            title: $title,
            description: $description,
            version: $version,
            endpoints: $endpoints,
            server_url: $server_url,
            metadata: {
                file_size: ($file_size | tonumber),
                file_hash: $file_hash,
                last_modified: ($last_modified | tonumber),
                format: $format
            }
        }'
}

# Main processing function
process_openapi_files() {
    local apis=()
    
    # Check if OpenAPI directory exists
    if [[ ! -d "$OPENAPI_DIR" ]]; then
        log_warn "OpenAPI directory not found: $OPENAPI_DIR"
        mkdir -p "$OPENAPI_DIR"
        log_info "Created OpenAPI directory: $OPENAPI_DIR"
    fi
    
    # Process YAML/YML files
    while IFS= read -r -d '' file; do
        if [[ -f "$file" ]]; then
            log_info "Found OpenAPI file: $file"
            local api_data
            api_data=$(parse_openapi_file "$file")
            if [[ -n "$api_data" ]]; then
                apis+=("$api_data")
            fi
        fi
    done < <(find "$OPENAPI_DIR" -type f \( -name "*.yaml" -o -name "*.yml" -o -name "*.json" \) -print0 2>/dev/null || true)
    
    # Generate summary statistics
    local total_apis=${#apis[@]}
    local total_endpoints=0
    
    if [[ $total_apis -gt 0 ]]; then
        # Calculate total endpoints
        for api in "${apis[@]}"; do
            local endpoint_count
            # log_info "Calculating endpoints for API: $(cat "$api" | jq -r '.title')"
            endpoint_count=$(echo "$api" | jq -r '.endpoints')
            total_endpoints=$((total_endpoints + endpoint_count))
        done
    fi
    
    # Create final JSON structure
    local apis_json
    if [[ $total_apis -gt 0 ]]; then
        apis_json=$(printf '%s\n' "${apis[@]}" | jq -s '.')
    else
        apis_json="[]"
    fi
    
    # Generate output with metadata
    jq -n \
        --argjson apis "$apis_json" \
        --argjson total_apis "$total_apis" \
        --argjson total_endpoints "$total_endpoints" \
        --arg generated_at "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
        --arg script_version "1.0.0" \
        '{
            summary: {
                total_apis: $total_apis,
                total_endpoints: $total_endpoints,
                generated_at: $generated_at,
                script_version: $script_version
            },
            apis: $apis
        }' > "$OUTPUT_FILE"
    
    log_info "Generated OpenAPI summary: $OUTPUT_FILE"
    log_info "Total APIs: $total_apis, Total endpoints: $total_endpoints"
}

# Generate manifest file
generate_manifest() {
    if [[ ! -f "$OUTPUT_FILE" ]]; then
        log_error "Output file not found: $OUTPUT_FILE"
        return 1
    fi
    
    local output_hash
    output_hash=$(sha256sum "$OUTPUT_FILE" | cut -d' ' -f1)
    
    local output_size
    output_size=$(stat -f%z "$OUTPUT_FILE" 2>/dev/null || stat -c%s "$OUTPUT_FILE" 2>/dev/null || echo "0")
    
    jq -n \
        --arg file_hash "$output_hash" \
        --arg file_size "$output_size" \
        --arg generated_at "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
        --arg script_path "$(realpath "$0")" \
        --arg source_directory "$(realpath "$OPENAPI_DIR")" \
        '{
            openapi_json: {
                file_hash: $file_hash,
                file_size: ($file_size | tonumber),
                generated_at: $generated_at
            },
            generation: {
                script_path: $script_path,
                source_directory: $source_directory,
                timestamp: $generated_at
            }
        }' > "$MANIFEST_FILE"
    
    log_info "Generated manifest: $MANIFEST_FILE"
}

# @todo Add support for gRPC files parsing
placeholder_grpc() {
    if [[ ! -d "$GRPC_DIR" ]]; then
        mkdir -p "$GRPC_DIR"
        log_info "Created gRPC directory: $GRPC_DIR (placeholder)"
    fi
    log_warn "gRPC parsing not implemented yet (placeholder)"
}

# Main execution
main() {
    log_info "Starting API documentation generation"
    
    # Ensure output directory exists
    mkdir -p "$APIS_DIR"
    
    # Check dependencies
    check_dependencies
    
    # Process OpenAPI files
    process_openapi_files
    
    # Generate manifest
    generate_manifest
    
    # Handle gRPC placeholder
    placeholder_grpc
    
    log_info "API documentation generation completed successfully"
}

# Execute main function
main "$@"
