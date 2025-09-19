---
title: "Developer Experience"
desc: "Tools and best practices for enhancing developer productivity."
keywords: ["developer", "productivity", "best practices"]
hide_title: true
---

# DevEx

## Generate self-signed certificates.
### `ssl-cert.sh`

Usage
```bash
# Generate
./scripts/ssl-cert.sh
# Run HAPI Server
hapi serve petstore --mcp --cert ~/.hapi/certs/cert.pem --key ~/.hapi/certs/key.pem
```

[Download here](pathname:///scripts/ssl-cert.sh).

Since: v0.3.1

[Go to top](#DevEx)