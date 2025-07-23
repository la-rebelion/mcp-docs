import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/Footer/LinkItem';

export default function FooterLinkItem({item}: Props): ReactNode {
  const {to, href, label, prependBaseUrlToHref, className, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});

  return (
    <Link
      className={clsx('footer__link-item', className)}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
      style={{
        color: 'rgba(255, 255, 255, 0.8)',
        textDecoration: 'none',
        fontSize: '0.95rem',
        lineHeight: '1.6',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0',
        transition: 'all 0.2s ease',
        borderRadius: '4px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#17bfe1'; // MCP blue lighter
        e.currentTarget.style.transform = 'translateX(4px)';
        e.currentTarget.style.textDecoration = 'none';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.textDecoration = 'none';
      }}>
      {label}
      {href && !isInternalUrl(href) && (
        <IconExternalLink 
          style={{
            marginLeft: '0.25rem',
            fontSize: '0.75rem',
            opacity: 0.7,
          }} 
        />
      )}
    </Link>
  );
}
