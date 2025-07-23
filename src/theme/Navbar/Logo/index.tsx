import React, {type ReactNode, useState} from 'react';
import Logo from '@theme/Logo';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NavbarLogo(): ReactNode {
  const [isHovered, setIsHovered] = useState(false);
  const staticLogo = useBaseUrl('/img/logo.svg');
  const animatedLogo = useBaseUrl('/img/mcp-animated-logo.svg');

  return (
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
    />
  );
}
