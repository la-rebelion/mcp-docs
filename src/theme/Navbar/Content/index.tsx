import React, {type ReactNode, useState} from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  ErrorCauseBoundary,
  ThemeClassNames,
  useColorMode,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerLeft,
          'navbar__items',
        )}>
        {left}
      </div>
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerRight,
          'navbar__items navbar__items--right',
        )}>
        {right}
      </div>
    </div>
  );
}

// Components dropdown menu with hover effect, similar to Dyte.io
function ComponentsDropdown(): ReactNode {
  const [isHovered, setIsHovered] = useState(false);
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  
  // Component sections data
  const sections = [
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
          href: '/components/chatmcp/integrating-with-hapi',
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
          href: '/components/hapi-server/openapi',
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
      className={styles.componentsDropdown}
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

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
          <ComponentsDropdown />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
