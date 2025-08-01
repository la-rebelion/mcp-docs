import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './styles.module.css';

type ComponentSection = {
  title: string;
  items: {
    label: string;
    href: string;
    description: string;
    icon?: string;
  }[];
};

export default function ComponentsDropdown({
  mobile = false,
}: {
  mobile?: boolean;
}): React.ReactNode {
  const [isHovered, setIsHovered] = useState(false);
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const sections: ComponentSection[] = [
    {
      title: 'chatMCP',
      items: [
        {
          label: 'Overview',
          href: '/components/chatmcp',
          description: 'chatMCP component overview and features',
          icon: '💬',
        },
        {
          label: 'API Reference',
          href: '/components/chatmcp/api',
          description: 'Complete API reference for chatMCP',
          icon: '📚',
        },
      ],
    },
    {
      title: 'HAPI Server',
      items: [
        {
          label: 'Overview',
          href: '/components/hapi-server',
          description: 'HAPI server component overview and features',
          icon: '🚀',
        },
        {
          label: 'API Reference',
          href: '/components/hapi-server/api',
          description: 'Complete API reference for HAPI server',
          icon: '📚',
        },
      ],
    },
    {
      title: 'runMCP',
      items: [
        {
          label: 'Overview',
          href: '/components/runmcp',
          description: 'runMCP component overview and features',
          icon: '⚡',
        },
        {
          label: 'API Reference',
          href: '/components/runmcp/api',
          description: 'Complete API reference for runMCP',
          icon: '📚',
        },
      ],
    },
  ];

  return (
    <div
      className={clsx(styles.componentsDropdown, {
        [styles.componentsDropdownMobile]: mobile,
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        className={clsx(styles.navbarButton, {
          [styles.navbarButtonHovered]: isHovered,
        })}
      >
        Components
        <svg
          width="10"
          height="6"
          className={clsx(styles.navbarButtonIcon, {
            [styles.navbarButtonIconRotated]: isHovered,
          })}
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={clsx(styles.dropdownContainer, {
          [styles.dropdownContainerVisible]: isHovered,
          [styles.dropdownContainerDark]: isDarkTheme,
          [styles.dropdownContainerLight]: !isDarkTheme,
        })}
      >
        <div className={styles.dropdownContent}>
          {sections.map((section) => (
            <div key={section.title} className={styles.dropdownSection}>
              <h3 className={styles.dropdownSectionTitle}>{section.title}</h3>
              <div className={styles.dropdownItems}>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={useBaseUrl(item.href)}
                    className={styles.dropdownItem}
                  >
                    {item.icon && (
                      <span className={styles.dropdownItemIcon}>{item.icon}</span>
                    )}
                    <div className={styles.dropdownItemContent}>
                      <h4 className={styles.dropdownItemTitle}>{item.label}</h4>
                      <p className={styles.dropdownItemDescription}>
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
