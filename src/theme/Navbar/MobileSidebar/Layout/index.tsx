import React, {version, type ReactNode} from 'react';
import clsx from 'clsx';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Navbar/MobileSidebar/Layout';

// @todo Docusaurus v4: remove temporary inert workaround
//  See https://github.com/facebook/react/issues/17157
//  See https://github.com/radix-ui/themes/pull/509
import {useEffect, useRef} from 'react';

function NavbarMobileSidebarPanel({
  children,
  inert,
}: {
  children: ReactNode;
  inert: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @note: React does not support the inert attribute natively, so we set it imperatively.
    if (panelRef.current) {
      if (inert) {
        panelRef.current.setAttribute('inert', '');
      } else {
        panelRef.current.removeAttribute('inert');
      }
    }
  }, [inert]);

  return (
    <div
      ref={panelRef}
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.panel,
        'navbar-sidebar__item menu',
      )}>
      {children}
    </div>
  );
}

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}: Props): ReactNode {
  const {shown: secondaryMenuShown} = useNavbarSecondaryMenu();
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.container,
        'navbar-sidebar',
      )}>
      {header}
      <div
        className={clsx('navbar-sidebar__items', {
          'navbar-sidebar__items--show-secondary': secondaryMenuShown,
        })}>
        <NavbarMobileSidebarPanel inert={secondaryMenuShown}>
          {primaryMenu}
        </NavbarMobileSidebarPanel>
        <NavbarMobileSidebarPanel inert={!secondaryMenuShown}>
          {secondaryMenu}
        </NavbarMobileSidebarPanel>
      </div>
    </div>
  );
}
