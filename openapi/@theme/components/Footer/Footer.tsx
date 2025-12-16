import React from 'react';
import styled from 'styled-components';

import type { JSX } from 'react';
import type { ResolvedNavItem } from '@redocly/config';

import { FooterItem } from '@redocly/theme/components/Footer/FooterItem';
import { breakpoints, isEmptyArray } from '@redocly/theme/core/utils';
import { useThemeConfig } from '@redocly/theme/core/hooks';
import { FooterCopyright } from '@redocly/theme/components/Footer/FooterCopyright';
import { FooterColumn } from '@redocly/theme/components/Footer/FooterColumn';
import logo from '../../../images/Melissa-favicon.png';

export type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps): JSX.Element | null {
  const { footer } = useThemeConfig() || {};
  const { items = [], copyrightText } = footer || {};

  if ((isEmptyArray(items) && !copyrightText) || footer?.hide) {
    return null;
  }

  const withColumns = items.some((item) => (item?.items?.length || 0) > 0);

  return (
    <FooterWrapper
      data-component-name="Footer/Footer"
      className={className}
      withColumns={withColumns}
    >
      {!!items.length && (
        <FooterColumnsSection>
          {withColumns
            ? (items as ResolvedNavItem[]).map((column, index) => (
                <FooterColumn key={`${column.label}_${index}`} column={column} />
              ))
            : (items as ResolvedNavItem[]).map((item, index) => (
                <FooterItem key={index} item={item} />
              ))}
        </FooterColumnsSection>
      )}
      <FooterCopyrightWrapper>
        <div
          role="navigation"
          aria-label="Social media"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
          }}
        >
          {[
            {
              href: 'https://www.melissa.com',
              label: 'Melissa Website',
              svg: (
                <img
                  src={logo}
                  alt="Melissa Website"
                  width={20}
                  height={20}
                  style={{ objectFit: 'cover' }}
                />
              )
            },
            {
              href: 'https://github.com/MelissaData?tab=repositories',
              label: 'GitHub',
              svg: (
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.9.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.56 1.41.21 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.95.68 1.93 0 1.39-.01 2.51-.01 2.85 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
                  />
                </svg>
              )
            },
            {
              href: 'https://www.instagram.com/melissadatacorp/',
              label: 'Instagram',
              svg: (
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                  />
                </svg>
              )
            }
          ].map(({ href, label, svg }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 6,
                color: 'inherit',
                textDecoration: 'none',
                opacity: 0.9,
              }}
            >
              {svg}
            </a>
          ))}
        </div>
      </FooterCopyrightWrapper>
      <FooterCopyrightWrapper>
        {copyrightText && <FooterCopyright copyrightText={copyrightText} />}
      </FooterCopyrightWrapper>
    </FooterWrapper>
  );
}

const FooterCopyrightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  align-self: center;

  @media screen and (min-width: ${breakpoints.medium}) {
    margin-top: 0;
  }

  @media screen and (min-width: ${breakpoints.max}) {
    max-width: var(--container-max-width);
    margin-left: auto;
    margin-right: auto;
  }
`;

const FooterColumnsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: var(--footer-column-gap);

  @media screen and (min-width: ${breakpoints.small}) {
    flex-direction: row;
  }

  @media screen and (min-width: ${breakpoints.max}) {
    max-width: var(--container-max-width);
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const FooterWrapper = styled.footer<{ withColumns?: boolean }>`
  padding: var(--mobile-footer-padding-vertical) var(--mobile-footer-padding-horizontal);
  border-top: 1px solid var(--footer-border-color);
  font-size: var(--footer-font-size);
  flex-shrink: 0;
  background-color: var(--footer-bg-color);
  color: var(--footer-text-color);
  font-weight: var(--footer-font-weight);
  gap: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: ${breakpoints.small}) {
    padding: var(--footer-padding-vertical) var(--footer-padding-horizontal);
    flex-direction: row;
    ${({ withColumns }) =>
      withColumns
        ? `
    flex-direction: column;
    align-items: stretch;
  `
        : `justify-content: space-between;`}
  }
`;