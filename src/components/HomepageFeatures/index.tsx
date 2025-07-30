import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  imgPath?: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'API-First Integration',
    Svg: require('@site/static/img/diagrams/hapi-overview.svg').default,
    description: (
      <>
        HAPI MCP enables seamless AI integration by dynamically converting OpenAPI
        specifications into MCP tools, eliminating the need for custom server
        implementations.
      </>
    ),
  },
  {
    title: 'Centralized Management',
    // Svg: require('@site/static/img/diagrams/hapi-mcp-diagram.svg').default,
    imgPath: '/img/diagrams/hapi-mcp-diagram.svg',
    description: (
      <>
        Manage multiple HAPI MCP servers effortlessly with runMCP, the control
        plane dashboard that orchestrates tools and routes AI agent requests
        efficiently.
      </>
    ),
  },
  {
    title: 'Interactive AI Interface',
    Svg: require('@site/static/img/diagrams/runMCP-flow.svg').default,
    description: (
      <>
        chatMCP provides an intuitive interface for AI agents to discover and
        invoke MCP tools, enabling dynamic workflows and seamless backend
        interactions.
      </>
    ),
  },
];

function Feature({title, Svg, imgPath, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg ? (
          <Svg className={styles.featureSvg} role="img" />
        ) : (
          <img src={imgPath} alt={title} className={styles.featureSvg} />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
