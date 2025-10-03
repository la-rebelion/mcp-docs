---
sidebar_position: 1
sidebar_label: Known Issues
---

# Known Issues: MCP, OpenAPI, API-first

List of known issues with MCP, OpenAPI, and API-first workflows.

This document is a living document and will be updated as new issues are discovered and resolved. Not all issues may have a workaround or solution, and some issues may be specific to the **API design** or implementation, not MCP or HAPI itself.

## OpenAPI Path Parameter Naming Conflicts

When defining paths in an OpenAPI specification, it's crucial to ensure that path parameters are named consistently to avoid conflicts. A common issue arises when two paths have the same structure but use different parameter names, leading to ambiguity and errors during server startup.

### Failed to start server: Cannot create route "`/test/{name}/sub`" with parameter "`name`" because a route already exists with a different parameter name ("`id`") in the same location.

Based on the [OpenAPI specification](https://swagger.io/specification/#path-templating-matching), this is an invalid OpenAPI definition because the paths are considered identical due to their structure, despite having different parameter names.

The Issue with this API Design is that there are two paths that could potentially cause conflicts:

- `/test/{name}/sub`
- `/test/{id}`

**Recommendations**

1. Use Consistent Parameter Names  
**Best practice:** Use the same parameter name for the same semantic entity across all paths.

    ```yaml
    # Good practice
    /test/{id}
    /test/{id}/sub
    ```

    This makes it clear that you're dealing with the same type of resource identifier in both paths.

2. Differentiate Path Structures  
If you truly need to access resources by different identifiers, make the paths structurally different:

    ```yaml
    /test/by-id/{id}
    /test/by-name/{name}/sub
    ```

3. Use Query Parameters Instead  
For alternative ways to identify a resource, consider using query parameters:

    ```yaml
    /test?id={id}
    /test?name={name}
    # OR
    /test/{id}              # Access by ID
    /test?name={name}       # Access by name
    ```

4. Add Resource Type Prefixes

    ```yaml
    /test/user/{id}
    /test/product/{id}/sub
    ```

**Implementation Considerations**

**Don't rely on backend validation alone:** While you could theoretically handle name vs. ID validation in your code, the OpenAPI specification won't properly document this distinction, leading to potential confusion and routing issues.

**Resource identification:** If you need to support multiple ways to identify the same resource (ID, name, email, etc.), use the query parameter approach or create distinct path structures.

**API consistency:** Whatever approach you choose, be consistent throughout your API design to make it intuitive for developers to use.

### Conclusion

The most straightforward solution is to use consistent parameter names when referring to the same type of entity, and to create structurally distinct paths when dealing with different types of resources or identification methods.
