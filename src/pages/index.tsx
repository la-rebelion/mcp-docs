import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import { TerminalDemo } from '../components/TerminalDemo';

const SvgLogo: React.ComponentType<React.ComponentProps<'svg'>> = require('@site/static/img/diagrams/mcp-hapi-server-face.svg').default;

/**
 * Hero section with clear value proposition and CTA
 * Follows "Blank-for-Blank" positioning strategy
 */
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* Badge for credibility */}
        <div className={styles.heroBadge}>
          <span className={styles.badgeIcon}>📚</span>
          <span>Documentation</span>
        </div>

        <div className={styles.heroContent}>
          {/* Left Column: Text & CTA */}
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              {siteConfig.tagline}
            </p>
            {/* Problem-matching: Speak to pain points */}
            <p className={styles.heroDescription}>
              Stop building custom MCP servers from scratch. Deploy production-ready 
              API integrations in <strong>seconds, not weeks</strong>.
            </p>
            <div className={styles.heroCta}>
              <Link
                className={clsx('button button--primary button--lg', styles.ctaPrimary)}
                to="/getting-started/"
              >
                Get Started
                <span className={styles.ctaArrow}>→</span>
              </Link>
              <Link
                className={clsx('button button--outline button--lg', styles.ctaSecondary)}
                to="/overview"
              >
                Learn More
              </Link>
            </div>
            {/* Quick install commands */}
            <div className={styles.installCommands}>
              <code className={styles.installCode}>
                <span className={styles.installPrefix}>$</span> curl -fsSL https://get.mcp.com.ai/hapi.sh | bash
              </code>
              <button className={styles.copyButton} title="Copy to clipboard">
                📋
              </button>
            </div>
          </div>

          {/* Right Column: Illustration */}
          <div className="mt-20">
            <TerminalDemo />
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Component cards section inspired by mcp-use
 * Shows Agent, Client, Server as key modules
 */
function ComponentCards() {
  const components = [
    {
      title: 'HAPI Server',
      description: 'Transform any OpenAPI spec into MCP tools automatically.',
      icon: '🖥️',
      link: '/components/hapi-server/',
      tags: ['OpenAPI', 'Auto-generation'],
    },
    {
      title: 'runMCP',
      description: 'Orchestrate and manage multiple MCP servers from one dashboard.',
      icon: '🎛️',
      link: '/components/runmcp/',
      tags: ['Dashboard', 'Management'],
    },
    {
      title: 'chatMCP',
      description: 'Interactive AI interface to discover and invoke MCP tools.',
      icon: '💬',
      link: '/components/chatmcp/',
      tags: ['Chat', 'AI Interface'],
    },
  ];

  return (
    <section className={styles.componentsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Components</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Full-Stack MCP Framework
          </Heading>
          <p className={styles.sectionSubtitle}>
            Everything you need to build with the Model Context Protocol—from servers to AI agents.
          </p>
        </div>
        <div className={styles.componentCards}>
          {components.map((comp, idx) => (
            <Link key={idx} to={comp.link} className={styles.componentCard}>
              <div className={styles.cardIcon}>{comp.icon}</div>
              <Heading as="h3" className={styles.cardTitle}>{comp.title}</Heading>
              <p className={styles.cardDescription}>{comp.description}</p>
              <div className={styles.cardTags}>
                {comp.tags.map((tag, i) => (
                  <span key={i} className={styles.cardTag}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Features section with value propositions
 * Follows "Problem Matching" and "Urgency" strategies
 */
function FeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: 'Zero Custom Code',
      description: 'No need to build MCP servers from scratch. Your OpenAPI specs become MCP tools instantly.',
    },
    {
      icon: '🔒',
      title: 'Enterprise Ready',
      description: 'Built-in authentication, rate limiting, and security features for production deployments.',
    },
    {
      icon: '🔄',
      title: 'Real-time Sync',
      description: 'API changes propagate automatically. Keep your AI tools always up-to-date.',
    },
    {
      icon: '📊',
      title: 'Observability',
      description: 'Full visibility into API calls, tool usage, and AI agent interactions.',
    },
    {
      icon: '🌐',
      title: 'Cloud or On-Premise',
      description: 'Deploy anywhere—managed cloud, your own infrastructure, or hybrid setups.',
    },
    {
      icon: '🤝',
      title: 'Spec Compliant',
      description: 'Fully compliant with the Model Context Protocol specification.',
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Features</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Why Choose HAPI MCP?
          </Heading>
          <p className={styles.sectionSubtitle}>
            Build, preview, ship, and iterate with confidence.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureItem}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <Heading as="h4" className={styles.featureTitle}>{feature.title}</Heading>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Quick links section for docs navigation
 */
function QuickLinks() {
  const links = [
    { title: 'Quickstart', description: 'Deploy your first MCP server', link: '/getting-started/quickstart', icon: '🚀' },
    { title: 'Concepts', description: 'Understand HAPI MCP fundamentals', link: '/overview', icon: '📖' },
    { title: 'Examples', description: 'Real-world implementations', link: '/examples/', icon: '💡' },
    { title: 'API Reference', description: 'Explore available tools', link: '/servers-apis/openapi', icon: '📋' },
  ];

  return (
    <section className={styles.quickLinksSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Explore</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Jump Right In
          </Heading>
        </div>
        <div className={styles.quickLinksGrid}>
          {links.map((item, idx) => (
            <Link key={idx} to={item.link} className={styles.quickLinkCard}>
              <div className={styles.quickLinkIcon}>{item.icon}</div>
              <div className={styles.quickLinkContent}>
                <Heading as="h4" className={styles.quickLinkTitle}>{item.title}</Heading>
                <p className={styles.quickLinkDescription}>{item.description}</p>
              </div>
              <span className={styles.quickLinkArrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home of Model Context Protocol with no-code deployment"
      description="Deploy and manage Model Context Protocol servers effortlessly with HAPI MCP Server, MCPs with no shadows.">
      <HomepageHeader />
      <main>
        <ComponentCards />
        <FeaturesSection />
        <QuickLinks />
      </main>
    </Layout>
  );
}