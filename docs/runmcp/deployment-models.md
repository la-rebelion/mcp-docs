---
sidebar_position: 3
sidebar_label: Deployment Models
sidebar_class_name: green
---
import JSONLD from '@theme/JSONLD';

# Deployment Models: RunMCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Deployment Models: RunMCP, OpenAPI, API-first",
  "description": "Explore different deployment models for RunMCP in the MCP stack, including single-node, multi-node, and cloud-native strategies.",
  "keywords": "RunMCP, deployment models, OpenAPI, API-first, Model Context Protocol, MCP, scaling, multi-tenancy, cloud-native",
  "author": {
    "@type": "Organization",
    "name": "La Rebelion",
    "url": "https://github.com/la-rebelion"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MCP Project",
    "url": "https://github.com/la-rebelion/mcp-docs"
  },
  "dateModified": "2025-07-27"
}} />

RunMCP supports a range of deployment models, from simple single-node gateways to highly available, multi-node, cloud-native clusters.

## Common Deployment Models
- **Single-node:** All traffic routed through one gateway instance (good for dev/test)
- **Multi-node:** Multiple gateways behind a load balancer for high-availability
- **Cloud-native:** Kubernetes or container-based deployments with dynamic scaling
- **Hybrid:** Mix on-prem and cloud, or combine with other API gateways

:::tip
For production, use at least two gateway instances behind a load balancer for redundancy and zero-downtime upgrades.
:::

### Example: Docker Compose (Dev)
```yaml
version: '3.8'
services:
  runmcp:
    image: larebelion/runmcp:latest
    ports:
      - "8080:8080"
    volumes:
      - ./config:/app/config
```

### Example: Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: runmcp-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: runmcp-gateway
  template:
    metadata:
      labels:
        app: runmcp-gateway
    spec:
      containers:
        - name: runmcp
          image: larebelion/runmcp:latest
          ports:
            - containerPort: 8080
          volumeMounts:
            - name: config
              mountPath: /app/config
      volumes:
        - name: config
          configMap:
            name: runmcp-config
```

:::caution
Use persistent storage for configuration and logs in production deployments.
:::

## Best Practices
- Use environment variables for secrets and config
- Monitor gateway health and scale horizontally as needed
- Automate deployments with CI/CD pipelines

## Further Reading
- [run-mcp source code](https://github.com/la-rebelion/run-mcp)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
