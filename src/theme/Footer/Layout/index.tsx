import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Props} from '@theme/Footer/Layout';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): ReactNode {
  const mcpLogoWhite = useBaseUrl('/img/mcp-com-ai-white.png');
  
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': style === 'dark',
      })}
      style={{
        background: 'linear-gradient(135deg, #0c6679 0%, #1193b0 50%, #b84a1e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Background decoration */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1,
        }}
      />
      
      <div className="container container-fluid" style={{ position: 'relative', zIndex: 1 }}>
        {/* MCP Branding Section */}
        <div 
          style={{
            textAlign: 'center',
            padding: '2rem 0 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem',
          }}
        >
          <img 
            src={mcpLogoWhite} 
            alt="MCP" 
            style={{
              height: '40px',
              marginBottom: '1rem',
              filter: 'brightness(1.1)',
            }}
          />
          <p 
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.1rem',
              margin: 0,
              fontWeight: 500,
            }}
          >
            Model Context Protocol - Connecting AI models with the world
          </p>
        </div>
        
        {links}
        
        {(logo || copyright) && (
          <div className="footer__bottom text--center" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            {copyright && (
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                {copyright}
              </div>
            )}
            <div style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem' }}>
              Built with ❤️ using Docusaurus and enhanced with MCP branding
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
