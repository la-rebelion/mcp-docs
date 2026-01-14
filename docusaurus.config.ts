import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Hubspot account id
const hubspot = {
  accountId: '21339207',
};
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const config: Config = {
  title: 'HAPI MCP Docs',
  tagline: 'Headless APIs for MCP — Your APIs, AI-Ready. No Shadows.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.mcp.com.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'la-rebelion', // Usually your GitHub org/user name.
  projectName: 'mcp-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  trailingSlash: false,

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // editUrl: 'https://github.com/la-rebelion/mcp-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-JJJXXEZWK9',
        },
        googleTagManager: {
          containerId: 'GTM-W2QSRMJN',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/dont-build-mcp-server.png',
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'HAPI MCP',
      logo: {
        alt: 'MCP Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: '/examples/',
          label: 'Demos',
          position: 'left',
        },
        {
          href: '/glossary',
          label: 'Glossary',
          position: 'left',
        },
        {
          label: 'Blog',
          href: 'https://rebelion.la/series/mcp',
        },
        {
          href: 'https://go.rebelion.la/demo-request',
          label: 'Request a Demo',
          position: 'right',
          className: 'button--primary',
        },
        // {
        //   href: 'https://github.com/la-rebelion/mcp-docs',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Solutions',
          items: [
            {
              label: 'runMCP',
              to: 'https://run.mcp.com.ai',
            },
            {
              label: 'chatMCP',
              to: 'https://chat.mcp.com.ai',
            },
            {
              label: 'HAPI MCP',
              to: 'https://hapi.mcp.com.ai',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@LaRebelion',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/EpHzbPee',
            },
            {
              label: 'X',
              href: 'https://x.com/LaRebelionLabs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/la-rebelion/mcp-docs',
            },
            {
              label: 'Blog',
              href: 'https://rebelion.la/series/mcp',
            },
            {
              label: 'Contact Us',
              href: 'https://go.rebelion.la/contact-us',
            }
            // {
            //   href: 'https://go.rebelion.la/sponsors',
            //   label: 'Sponsor',
            // },
            // {
            //   href: 'https://www.buymeacoffee.com/larebelion',
            //   label: 'Add Caffeine ☕',
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} by <a href="https://rebelion.la">La Rebelion Labs</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  scripts: [
    {
      src: 'https://js.hsforms.net/forms/embed/v2.js',
      async: true,
    },
  ],
  headTags: [
    {
      tagName: 'script',
      attributes: {
        async: "true",
        defer: "true",
        type: 'text/javascript',
        id: 'hs-script-loader',
        src: `//js.hs-scripts.com/${hubspot.accountId}.js`,
      },
    },
  ],
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
