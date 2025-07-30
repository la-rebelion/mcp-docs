const DEFAULT_AUTHOR = {
  "@type": "Organization",
  "name": "La Rebelion Labs",
  "url": "https://rebelion.la",
};

const DEFAULT_PUBLISHER = {
  "@type": "Organization",
  "name": "MCP Project",
  "url": "https://github.com/la-rebelion/mcp-docs",
};

/**
 * Maps front-matter metadata to JSON-LD TechArticle schema.
 * @param {object} frontMatter - The front-matter metadata from the page.
 * @returns {object} JSON-LD schema object.
 */
function mapFrontMatterToJSONLD(frontMatter) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: frontMatter.title || "HAPI MCP: The API-first, OpenAPI-Driven Model Context Protocol",
    description:
      frontMatter.description ||
      "Documentation for the Model Context Protocol (MCP) - API-first, OpenAPI-driven development.",
    keywords: Array.isArray(frontMatter.keywords)
      ? frontMatter.keywords.join(", ")
      : frontMatter.keywords ?? "MCP, Model Context Protocol, OpenAPI, API-first, documentation",
    about: "Headless API, Model Context Protocol (MCP), OpenAPI, API-first",
    audience: {
      "@type": "Audience",
      audienceType: "API Developers, Architects, Product Teams",
    },
    author: frontMatter.author
      ? {
          "@type": "Organization",
          name: frontMatter.author,
        }
      : DEFAULT_AUTHOR,
    publisher: frontMatter.publisher
      ? {
          "@type": "Organization",
          name: frontMatter.publisher,
        }
      : DEFAULT_PUBLISHER,
    ...(frontMatter.dateModified && { dateModified: frontMatter.dateModified }),
    ...(frontMatter.datePublished && { datePublished: frontMatter.datePublished }),
  };
}

// const { context } = require('@docusaurus/theme-common');

module.exports = function pluginJsonLD(context, options) {
  return {
    name: "docusaurus-plugin-jsonld",

    /**
     * Inject JSON-LD metadata into the <head> of the page.
     */
    injectHtmlTags() {
      // @note: useBlogPost hook to get blog post data
      const frontMatter = context.blogPost?.frontMatter || {};
      const jsonLdData = mapFrontMatterToJSONLD(frontMatter);

      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              type: "application/ld+json",
            },
            innerHTML: JSON.stringify(jsonLdData, null, 2),
          },
        ],
      };
    },
  };
};
