import React, { use } from 'react';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

export interface JSONLDProps {
  /**
   * The JSON-LD data object to inject. If not provided, front-matter metadata is used.
   */
  data?: Record<string, any>;
}

const DEFAULT_AUTHOR = {
  "@type": "Organization",
  "name": "La Rebelion Labs",
  "url": "https://rebelion.la"
} as const;

const DEFAULT_PUBLISHER = {
  "@type": "Organization", 
  "name": "MCP Project",
  "url": "https://github.com/la-rebelion/mcp-docs"
} as const;

/**
 * Maps Docusaurus front-matter metadata to JSON-LD TechArticle schema
 * @note This function respects the front-matter structure and provides sensible defaults
 */
const mapFrontMatterToJSONLD = (frontMatter: Record<string, any>): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': frontMatter.title || 'HAPI MCP: The API-first, OpenAPI-Driven Model Context Protocol',
    'description': frontMatter.description || 'Documentation for the Model Context Protocol (MCP) - API-first, OpenAPI-driven development.',
    'keywords': frontMatter.keywords || 'MCP, Model Context Protocol, OpenAPI, API-first, documentation',
    'about': 'Headless API, Model Context Protocol (MCP), OpenAPI, API-first',
    'audience': {
      '@type': 'Audience',
      'audienceType': 'API Developers, Architects, Product Teams'
    },
    'author': frontMatter.author ? {
      '@type': 'Organization',
      'name': frontMatter.author
    } : DEFAULT_AUTHOR,
    'publisher': frontMatter.publisher ? {
      '@type': 'Organization',
      'name': frontMatter.publisher
    } : DEFAULT_PUBLISHER,
    ...(frontMatter.dateModified && { 'dateModified': frontMatter.dateModified }),
    ...(frontMatter.datePublished && { 'datePublished': frontMatter.datePublished })
  };
};

/**
 * JSONLD React component for embedding JSON-LD structured data for SEO.
 * 
 * @example
 * // Use with custom data
 * <JSONLD data={{ "@type": "Article", "headline": "Custom Title" }} />
 * 
 * @example  
 * // Use front-matter metadata automatically
 * <JSONLD />
 */
const JSONLD: React.FC<JSONLDProps> = ({ data }) => {
  const { frontMatter } = useBlogPost();

  // @note Priority: explicit data prop > front-matter metadata > default schema
  const jsonLd = data || mapFrontMatterToJSONLD(frontMatter);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
};

export default JSONLD;
