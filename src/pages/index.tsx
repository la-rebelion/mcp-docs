import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const SvgLogo: React.ComponentType<React.ComponentProps<'svg'>> = require('@site/static/img/diagrams/mcp-hapi-server-face.svg').default;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={{ fontSize: '2.6rem', fontWeight: 700, marginBottom: 8 }}>
          {siteConfig.title}
        </Heading>
        {/* @note: Responsive style moved to CSS module */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 340 }}>
          {/* Left Column: Text & CTA */}
          <div
            style={{
              flex: 1,
              minWidth: 260,
              maxWidth: 520,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 24,
              padding: '32px 0',
            }}
          >
            <p className="hero__subtitle" style={{ fontSize: '1.25rem', color: '#b3c2e0', marginBottom: 16 }}>
              {siteConfig.tagline}
            </p>
            <div style={{ fontSize: '1.1rem', color: '#e0e6f6', marginBottom: 12 }}>
              Deploy Your First MCP Server in less than a minute
            </div>
            <div>
              <Link
                className="button button--secondary button--lg"
                to="/getting-started/"
                style={{ fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 12px 0 #1a2a4a33' }}
              >
                Get Started
              </Link>
            </div>
          </div>
          {/* Right Column: Illustration */}
          <div
            className={clsx("mcp-hero-illustration-col", styles.heroIllustrationCol)}
            style={{
              flex: 1,
              minWidth: 220,
              maxWidth: 320,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '32px 0',
              minHeight: 240,
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #1a2a4a 40%, #2e3c5d 100%)',
                borderRadius: '50%',
                boxShadow: '0 4px 32px 0 #1a2a4a44',
                padding: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // width: 250,
                height: 250,
              }}
            >
              <SvgLogo className={styles.heroLogo} role="img" height={300} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  // const { siteConfig } = useDocusaurusContext();
  
  return (
    <Layout
      title="Home of Model Context Protocol with no-code deployment"
      // title={`Hello from ${siteConfig.title}`}
      description="Deploy and manage Model Context Protocol servers effortlessly with HAPI MCP Server, MCPs with no shadows.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}