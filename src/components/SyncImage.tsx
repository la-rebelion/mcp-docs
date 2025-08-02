import React, { JSX } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

// Import SVGs directly
import HapiOverviewSvg from '@site/static/img/diagrams/hapi-overview.svg';
import HapiMcpDiagramSvg from '@site/static/img/diagrams/hapi-mcp-diagram.svg';
import RunMcpFlowSvg from '@site/static/img/diagrams/runMCP-flow.svg';
import ChatMcpContextFlowSvg from '@site/static/img/diagrams/chatmcp-context-flow.svg';
import ChatMCPContextEngineering from '@site/static/img/diagrams/chatmcp-context-engineering.svg';
import AgentArchitecture from '@site/static/img/diagrams/agent-architecture-diagram.svg';

interface InlineSVGProps {
  name: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

/**
 * Map of SVG image names to their imported components
 * 
 * @note Using direct imports instead of dynamic requires to ensure webpack can
 * properly process the SVG files at build time
 */
const svgImages: Record<string, React.ComponentType<React.ComponentProps<'svg'>>> = {
  'hapi-overview': HapiOverviewSvg,
  'hapi-mcp-diagram': HapiMcpDiagramSvg,
  'runMCP-flow': RunMcpFlowSvg,
  'chatMCP-context-flow': ChatMcpContextFlowSvg,
  'chatMCP-context-engineering': ChatMCPContextEngineering,
  'agent-architecture-diagram': AgentArchitecture,
};

/**
 * A component that renders SVG images inline for synchronous loading
 * 
 * @example
 * <InlineSVG name="hapi-overview" alt="HAPI MCP Overview Diagram" />
 */
export default function InlineSVG({
  name,
  alt,
  width,
  className,
  height = '100%', 
}: InlineSVGProps): JSX.Element {
  const isAvailable = Object.keys(svgImages).includes(name);

  return (
    isAvailable ? (
      React.createElement(svgImages[name], {
        width,
        height,
        className,
        role: 'img',
        'aria-label': alt,
      })
    ) : (
      <img
        src={useBaseUrl(`/img/diagrams/logo.svg`)}
        alt="Placeholder image"
      />
    )
  );
}
