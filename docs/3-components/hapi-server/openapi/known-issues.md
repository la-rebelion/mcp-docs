---
sidebar_position: 10
sidebar_label: Known Issues
title: 'Known Issues in HAPI Server OpenAPI Integration'
description: 'Learn about known issues and limitations in HAPI server OpenAPI integration, including MCP context handling, OpenAPI schema generation, and more.'
keywords:
  - known issues
  - HAPI server
  - OpenAPI
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-08-13'
---

# Known Issues in HAPI Server OpenAPI Integration

HAPI server's OpenAPI integration is robust, but like any complex system, it has some known issues and limitations. This document outlines these issues to help you navigate them effectively.

## Cannot create route with parameter name conflict

When defining routes in HAPI server using OpenAPI specifications, you may encounter an error related to parameter name conflicts. This typically occurs when two routes share the same path but use different parameter names.

### Snippet of OpenAPI Specification

```yaml
openapi: 3.0.0
# ... rest of the OpenAPI specification removed for brevity
paths:
  /background-checks:
    get:
      summary: Retrieve Background Checks
      responses:
        '200':
          description: Successful retrieval of background checks
        '401':
          description: Unauthorized access
        '404':
          description: Background checks not found
  /background-checks/{resourceId}/records:
    get:
      summary: Retrieve Background Check Records
      parameters:
        - name: resourceId          # <-- Ensure consistent parameter name here 👇🏽
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful retrieval of records
        '400':
          description: Bad request due to invalid parameters
  /background-checks/{id}/pdf:
    get:
      summary: Retrieve Background Check PDF
      parameters:
        - name: id                  # <-- Ensure consistent parameter name here 👆🏽
          in: path
          required: true
          schema:
            type: string
# ... rest of the OpenAPI specification removed for brevity
```

### Error:

```bash
2025-08-13 19:42:35 [ERROR]: Failed to start server: Cannot create route "/background-checks/:resourceId/records" with parameter "resourceId" because a route already exists with a different parameter name ("id") in the same location
2025-08-13 19:42:35 [ERROR]: Error: Cannot create route "/background-checks/:resourceId/records" with parameter "resourceId" because a route already exists with a different parameter name ("id") in the same location
```

### Cause

A path in the OpenAPI specification can be defined with static or dynamic parameters. For scenarios where the path is dynamic, such as `/background-checks/{id}/records`, it is crucial to ensure that the parameter names in the OpenAPI specification for all dynamic paths in common are consistent, otherwise, it can lead to errors initializing the HAPI server or unexpected behavior during API calls.

For example, given two paths:
- `/background-checks/{id}/records`
- `/background-checks/{resourceId}/records`

If the OpenAPI specification defines these paths with different parameter names, it can lead to conflicts when HAPI server attempts to create routes. This is because HAPI server expects consistent parameter names across similar paths to avoid ambiguity in routing.

### Solution

To resolve this issue, ensure that all dynamic parameters in your OpenAPI specification are consistently named across similar paths. For instance, if you have a path like `/background-checks/{id}/records`, ensure that any other path that refers to the same resource uses the same parameter name (`id` in this case).

## Please encode all non-ASCII characters

When working with OpenAPI specifications in HAPI server, it is important to ensure that all non-ASCII characters are properly encoded. This is particularly relevant for paths, parameters, and other elements that may contain special characters.

### Snippet of OpenAPI Specification

```yaml
openapi: 3.0.0
# ... rest of the OpenAPI specification removed for

paths:
  /entities/{entityId}/datasources/mx/buro-de-credito/reports:
    get:
      tags:
        - DS MX Buró de Crédito Reports                 # <-- Non-ASCII characters 'é' and 'ó' in 'Buró de Crédito'
      operationId: GetEntityMxBuroDeCreditoReports
      summary: Get an entity's Buró de Crédito reports  # <-- Non-ASCII character 'é' and 'ó' in 'Buró de Crédito'
# ... rest of the OpenAPI specification removed for brevity
```

### Error:

```bash
2025-08-14 07:31:30 [ERROR]: Failed to start server: Invalid route "/entities/:entityId/datasources/mx/buro-de-credito/reports". Please encode all non-ASCII characters in the path.
2025-08-14 07:31:30 [ERROR]: TypeError: Invalid route "/entities/:entityId/datasources/mx/buro-de-credito/reports". Please encode all non-ASCII characters in the path.
```

### Cause

The error occurs when the HAPI server encounters a route with non-ASCII characters in its path or it's underlying objects. HAPI server requires that all paths be encoded to ensure proper routing and handling of requests. Non-ASCII characters can lead to issues in URL parsing and routing, which is why they must be encoded.

### Solution

To resolve this issue, ensure that all non-ASCII characters in your OpenAPI specification are properly encoded. For example, if you have a path like `/entities/:entityId/datasources/mx/buro-de-credito/reports`, you should encode the non-ASCII characters (like `é`) to their percent-encoded equivalents.

Other options include using Command-Line Tools:

**`tr` command**: This command can be used to delete characters outside the ASCII range.

```bash
LC_ALL=C tr -dc '\0-\177' < input_file > output_file
```

* LC_ALL=C: Ensures that character handling is based on the C locale, treating each byte as a distinct character, which is crucial for correct ASCII handling.
* -d: Deletes characters.
* -c: Complements the set of characters, meaning it considers characters not in the specified range.
* '\0-\177': Represents the octal range for ASCII characters (0 to 127).
* < input_file: Specifies the input file.
* > output_file: Redirects the output to a new file.

**`cat` and `grep` command**: These commands can be used together to filter out non-ASCII characters.

```bash
cat -v input_file.yaml | grep M-CM
```

This command will display the contents of `input_file.yaml`, replacing non-printable characters with their caret notation, and then filter lines containing "M-CM" to show only relevant lines with non-ASCII characters.

Using Programming Languages:

```Python
    with open('input.txt', 'r', encoding='utf-8') as infile, \
         open('output.txt', 'w', encoding='ascii', errors='ignore') as outfile:
        for line in infile:
            outfile.write(line)
```

This code reads the input file with UTF-8 encoding and writes to an output file with ASCII encoding, ignoring characters that cannot be encoded in ASCII.
Using Text Editors with Regular Expressions:

Many advanced text editors like Notepad++, Sublime Text, or VS Code allow you to use regular expressions to find and replace non-ASCII characters. The specific regex might vary slightly between editors, but a common pattern is `[^\x00-\x7F]` to match characters outside the ASCII range. You would then replace these matches with an empty string.