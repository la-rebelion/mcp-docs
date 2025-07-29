---
sidebar_position: 3
sidebar_label: Deployment Guide
sidebar_class_name: green
---
import JSONLD from '@theme/JSONLD';

# Deployment Guide: MCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Deployment Guide: MCP, OpenAPI, API-first",
  "description": "Learn how to deploy your Model Context Protocol (MCP) stack in local, cloud, and production environments using OpenAPI and API-first best practices.",
  "keywords": "MCP, deployment, OpenAPI, API-first, cloud, Docker, Kubernetes, CI/CD, best practices",
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

Deploying your MCP stack is straightforward, whether you're running locally or in the cloud.

## Local Development
- Use `bun run dev` for local testing
- Access Swagger/OpenAPI docs at `/api/docs`
- Use Docker Compose for multi-service setups

## Cloud Deployment (Docker)
```sh
docker build -t my-mcp-app .
docker run -p 8080:8080 my-mcp-app
```

## Kubernetes Deployment
- Use the provided `k8s.yaml` manifest
- Set up secrets and config maps for production
- Use Horizontal Pod Autoscaler for scaling

:::tip
Automate deployments with GitHub Actions or your preferred CI/CD tool.
:::

## Best Practices
- Use environment variables for secrets
- Monitor health and logs
- Test deployments in staging before production

## Further Reading
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
