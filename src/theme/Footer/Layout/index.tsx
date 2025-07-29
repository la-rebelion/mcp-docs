import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useThemeConfig, useColorMode} from '@docusaurus/theme-common';
import {ThemeClassNames} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Props} from '@theme/Footer/Layout';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): ReactNode {
  const mcpLogo = useBaseUrl('/img/android-chrome-192x192.png');
  const mcpLogoTxt = useBaseUrl('/img/logo.svg');
  const mcpAnimatedLogo = useBaseUrl('/img/mcp-animated-logo.svg');
  
  // Use the Docusaurus color mode hook to properly detect theme changes
  const {colorMode} = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  
  // Theme-specific colors
  const footerBackground = isDarkTheme
    ? 'linear-gradient(135deg, hsl(222.2 84% 4.9%) 0%, hsl(217.2 32.6% 17.5%) 50%, hsl(187 85% 15%) 100%)'
    : 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(210 40% 96.1%) 50%, hsl(187 85% 95%) 100%)';
    
  const borderColor = isDarkTheme
    ? 'hsl(217.2 32.6% 25%)'
    : 'hsl(214.3 31.8% 91.4%)';
    
  const patternColor = isDarkTheme ? 'ffffff' : '000000';
  const patternOpacity = isDarkTheme ? '0.05' : '0.02';
  
  // const logoToUse = isDarkTheme ? mcpLogo : mcpLogoTxt;
  const logoShadowColor = isDarkTheme 
    ? 'rgba(135, 238, 255, 0.3)' 
    : 'rgba(17, 147, 176, 0.2)';
  const logoShadowHoverColor = isDarkTheme 
    ? 'rgba(135, 238, 255, 0.5)' 
    : 'rgba(17, 147, 176, 0.3)';
  
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': isDarkTheme,
      })}
      style={{
        background: footerBackground,
        borderTop: `1px solid ${borderColor}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Advanced background pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 25% 25%, hsl(187 85% 53% / ${isDarkTheme ? '0.1' : '0.05'}) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(187 85% 53% / ${isDarkTheme ? '0.05' : '0.03'}) 0%, transparent 50%)`,
          opacity: isDarkTheme ? 0.3 : 0.2,
        }}
      />
      
      {/* Geometric pattern overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"grid\" width=\"60\" height=\"60\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M 60 0 L 0 0 0 60\" fill=\"none\" stroke=\"%23${patternColor}\" stroke-width=\"0.5\" stroke-opacity=\"${patternOpacity}\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" fill=\"url(%23grid)\"/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container container-fluid" style={{ position: 'relative', zIndex: 1 }}>
        {/* Enhanced MCP Branding Section */}
        <div 
          style={{
            textAlign: 'center',
            padding: '3rem 0 2rem',
            borderBottom: `1px solid ${borderColor}`,
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <img 
              src={mcpLogo} 
              alt="MCP" 
              style={{
                height: '48px',
                filter: `brightness(1.1) drop-shadow(0 2px 8px ${logoShadowColor})`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.filter = `brightness(1.2) drop-shadow(0 4px 16px ${logoShadowHoverColor})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = `brightness(1.1) drop-shadow(0 2px 8px ${logoShadowColor})`;
              }}
            /><img 
              src={mcpLogoTxt} 
              alt="MCP Text Logo" 
              style={{
                height: '48px',
                filter: `brightness(1.1) drop-shadow(0 2px 8px ${logoShadowColor})`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.filter = `brightness(1.2) drop-shadow(0 4px 16px ${logoShadowHoverColor})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = `brightness(1.1) drop-shadow(0 2px 8px ${logoShadowColor})`;
              }}
            />
          </div>
          
          <h3 
            style={{
              color: isDarkTheme ? 'hsl(210 40% 98%)' : 'hsl(222.2 84% 4.9%)',
              fontSize: '1.5rem',
              fontWeight: 700,
              margin: '0 0 0.5rem 0',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Model Context Protocol AI
          </h3>
          
          <p 
            style={{
              color: isDarkTheme ? 'hsl(215 20.2% 75%)' : 'hsl(215.4 16.3% 46.9%)',
              fontSize: '1.1rem',
              margin: '0 0 1rem 0',
              fontWeight: 500,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Connecting AI models with the world through standardized protocols
          </p>
          
          {/* Professional Stats or Features */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                color: isDarkTheme ? 'hsl(187 85% 68%)' : 'hsl(187 85% 43%)', 
                fontSize: '1.25rem', 
                fontWeight: 700 
              }}>Open Source</div>
              <div style={{ 
                color: isDarkTheme ? 'hsl(215 20.2% 65%)' : 'hsl(215.4 16.3% 46.9%)', 
                fontSize: '0.85rem' 
              }}>MIT Licensed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                color: isDarkTheme ? 'hsl(187 85% 68%)' : 'hsl(187 85% 43%)', 
                fontSize: '1.25rem', 
                fontWeight: 700 
              }}>Cross-Platform</div>
              <div style={{ 
                color: isDarkTheme ? 'hsl(215 20.2% 65%)' : 'hsl(215.4 16.3% 46.9%)', 
                fontSize: '0.85rem' 
              }}>Universal Protocol</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                color: isDarkTheme ? 'hsl(187 85% 68%)' : 'hsl(187 85% 43%)', 
                fontSize: '1.25rem', 
                fontWeight: 700 
              }}>Developer First</div>
              <div style={{ 
                color: isDarkTheme ? 'hsl(215 20.2% 65%)' : 'hsl(215.4 16.3% 46.9%)', 
                fontSize: '0.85rem' 
              }}>Easy Integration</div>
            </div>
          </div>
        </div>
        
        {links}
        
        {(logo || copyright) && (
          <div 
            className="footer__bottom text--center" 
            style={{ 
              marginTop: '2.5rem', 
              paddingTop: '2rem', 
              borderTop: `1px solid ${borderColor}`,
              background: isDarkTheme
                ? 'linear-gradient(90deg, transparent 0%, hsl(217.2 32.6% 15% / 0.5) 50%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, hsl(210 40% 96.1% / 0.8) 50%, transparent 100%)',
              borderRadius: '8px',
              padding: '2rem 1rem',
            }}
          >
            {copyright && (
              <div style={{ 
                color: isDarkTheme ? 'hsl(215 20.2% 75%)' : 'hsl(215.4 16.3% 46.9%)', 
                fontSize: '0.95rem',
                marginBottom: '1rem',
                fontWeight: 500,
              }}>
                {copyright}
              </div>
            )}
            <div style={{ 
              color: isDarkTheme ? 'hsl(215 20.2% 60%)' : 'hsl(215.4 16.3% 46.9%)', 
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}>
              <span>Built with</span>
              <span style={{ color: 'hsl(0 84% 60%)', fontSize: '1rem' }}>❤️</span>
              <span>using</span>
              <a 
                href="https://docusaurus.io" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: isDarkTheme ? 'hsl(187 85% 68%)' : 'hsl(187 85% 43%)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDarkTheme ? 'hsl(187 85% 78%)' : 'hsl(187 85% 53%)';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkTheme ? 'hsl(187 85% 68%)' : 'hsl(187 85% 43%)';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Docusaurus
              </a>
              <span>and enhanced with runMCP-inspired design</span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
