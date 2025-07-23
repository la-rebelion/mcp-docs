import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import type {Props} from '@theme/Footer/Links/MultiColumn';

type ColumnType = Props['columns'][number];
type ColumnItemType = ColumnType['items'][number];

function ColumnLinkItem({item}: {item: ColumnItemType}) {
  return item.html ? (
    <li
      className={clsx('footer__item', item.className)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: item.html}}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function Column({column}: {column: ColumnType}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        'col footer__col',
        column.className,
      )}
      style={{
        marginBottom: '2rem',
      }}>
      <div 
        className="footer__title" 
        style={{
          color: '#e8a896', // MCP orange lighter variant
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {column.title}
      </div>
      <ul 
        className="footer__items clean-list"
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn({columns}: Props): ReactNode {
  return (
    <div className="row footer__links">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}
