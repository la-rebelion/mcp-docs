---
sidebar_position: 4
sidebar_label: Scaling Instances
sidebar_class_name: blue
---
import JSONLD from '@theme/JSONLD';

# Scaling Instances: RunMCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Scaling Instances: RunMCP, OpenAPI, API-first",
  "description": "Learn how to scale RunMCP gateway instances for high-availability, performance, and seamless OpenAPI/MCP integration.",
  "keywords": "RunMCP, scaling, OpenAPI, API-first, Model Context Protocol, MCP, high-availability, load balancing, autoscaling",
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

Scaling RunMCP is essential for production workloads. Whether you’re serving thousands of users or running mission-critical APIs, follow these patterns for reliability and performance.

## Scaling Strategies
- **Horizontal scaling:** Add more gateway instances behind a load balancer
- **Stateless design:** Keep gateway state external (e.g., config, sessions)
- **Health checks:** Use readiness and liveness probes in orchestrators
- **Autoscaling:** Use Kubernetes HPA or cloud-native scaling solutions

:::tip
Monitor gateway CPU, memory, and response times. Scale out before bottlenecks impact users.
:::

### Example: Load Balancer Setup
```yaml
load_balancer:
  type: round_robin
  backends:
    - runmcp-1.internal
    - runmcp-2.internal
    - runmcp-3.internal
```

### Example: Kubernetes Horizontal Pod Autoscaler
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: runmcp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: runmcp-gateway
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

:::caution
Test scaling and failover in staging environments before going live.
:::

## Best Practices
- Use stateless gateway design for easy scaling
- Automate scaling and failover with orchestrators
- Monitor and alert on key metrics

## Further Reading
- [run-mcp source code](https://github.com/la-rebelion/run-mcp)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
