#!/bin/bash
# Set variables for certificate details
CERT_DIR="$HOME/.hapi/certs"
DAYS_VALID=365

# Parse arguments
TRUST_CERT=0
FQDN=""
for arg in "$@"; do
  case $arg in
    --trust)
      TRUST_CERT=1
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [fqdn] [--trust]"
      echo ""
      echo "Generates a self-signed SSL certificate for HAPI development."
      echo ""
      echo "Arguments:"
      echo "  fqdn      Fully qualified domain name for the certificate (optional, defaults to 'localhost')"
      echo ""
      echo "Options:"
      echo "  --trust   Add the generated certificate to your system's trusted certificates (requires confirmation and sudo)"
      echo ""
      echo "Examples:"
      echo "  $0"
      echo "  $0 mydomain.example.com"
      echo "  $0 mydomain.example.com --trust"
      exit 0
      ;;
    *)
      if [ -z "$FQDN" ]; then
        FQDN="$arg"
        shift
      fi
      ;;
  esac
done

if [ -z "$FQDN" ]; then
  FQDN="localhost"
fi

CERT_FILE="${CERT_DIR}/${FQDN}-cert.pem"
KEY_FILE="${CERT_DIR}/${FQDN}-key.pem"
SUBJECT="/C=US/ST=TX/L=Plano/O=LaRebelion/OU=HAPI/CN=${FQDN}"
SUBJECT_ALT_NAME="DNS:${FQDN},DNS:localhost,IP:127.0.0.1"

# Create directory for certificates if it doesn't exist
mkdir -p "${CERT_DIR}"

# Print information about what's happening
echo "Generating self-signed SSL certificate for HAPI development"
echo "FQDN: ${FQDN}"
echo "Certificate will be valid for ${DAYS_VALID} days"
echo "Certificate location: ${CERT_FILE}"
echo "Private key location: ${KEY_FILE}"

# Generate private key and self-signed certificate
openssl req -x509 \
  -newkey rsa:2048 \
  -nodes \
  -keyout "${KEY_FILE}" \
  -out "${CERT_FILE}" \
  -days "${DAYS_VALID}" \
  -subj "${SUBJECT}" \
  -extensions SAN \
  -config <(cat /etc/ssl/openssl.cnf \
    <(printf "\n[SAN]\nsubjectAltName=${SUBJECT_ALT_NAME}")) \
  2>/dev/null

# Check if certificate generation was successful
if [ $? -eq 0 ]; then
  echo -e "\n✅ Certificate generation successful!"
  echo -e "\nTo use this certificate with HAPI server, run:"
  echo -e "  hapi serve yourproject --cert ${CERT_FILE} --key ${KEY_FILE}"
  echo -e "\n⚠️  Note: This is a self-signed certificate and will show warnings in browsers."
  echo -e "   To trust this certificate in development, you'll need to add it to your system's trusted certificates."
  
  # Make the certificate and key files read-only
  chmod 400 "${KEY_FILE}"
  chmod 444 "${CERT_FILE}"
  
  # Print certificate information
  echo -e "\n📜 Certificate Information:"
  openssl x509 -in "${CERT_FILE}" -noout -text | grep -E 'Subject:|Issuer:|Not Before:|Not After :|DNS:'

  # If --trust flag is set, prompt user and add to trusted store
  if [ "$TRUST_CERT" -eq 1 ]; then
    echo -e "\n⚠️  You have requested to add this certificate to your system's trusted certificates."
    echo "This will affect your system's trust store and may require administrative privileges."
    echo "Are you sure you want to proceed? [y/N]"
    read -r CONFIRM
    if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
      # Detect OS and add to trusted store
      if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux (Debian/Ubuntu)
        if [ -d "/usr/local/share/ca-certificates" ]; then
          sudo cp "${CERT_FILE}" "/usr/local/share/ca-certificates/hapi-${FQDN}.crt"
          sudo update-ca-certificates
          echo "✅ Certificate added to trusted store (Debian/Ubuntu)."
        # Linux (Fedora/RHEL)
        elif [ -d "/etc/pki/ca-trust/source/anchors" ]; then
          sudo cp "${CERT_FILE}" "/etc/pki/ca-trust/source/anchors/hapi-${FQDN}.crt"
          sudo update-ca-trust
          echo "✅ Certificate added to trusted store (Fedora/RHEL)."
        else
          echo "❌ Unsupported Linux distribution for automatic trust. Please add manually."
        fi
      elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "${CERT_FILE}"
        echo "✅ Certificate added to macOS system keychain."
      else
        echo "❌ Unsupported OS for automatic trust. Please add manually."
      fi
    else
      echo "❌ Certificate NOT added to trusted store. Operation cancelled."
    fi
  fi
else
  echo "❌ Failed to generate certificate"
  echo "Make sure OpenSSL is installed on your system."
  exit 1
fi

echo -e "\n💡 For development only. Do not use in production environments."