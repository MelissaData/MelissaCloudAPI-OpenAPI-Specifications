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
              href: 'https://www.facebook.com/melissadata/',
              label: 'Facebook',
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
                    d="M22.68 0H1.32C.97 0 .634 .139 .387 .387C.139 .634 0 .97 0 1.32V22.68C0 23.03 .139 23.366 .387 23.613C.634 23.861 .97 24 1.32 24H12.816V14.7H9.696V11.1H12.816V8.4C12.751 7.766 12.826 7.126 13.035 6.524C13.244 5.922 13.583 5.373 14.026 4.916C14.47 4.458 15.008 4.104 15.603 3.876C16.199 3.649 16.836 3.555 17.472 3.6C18.406 3.594 19.34 3.642 20.268 3.744V6.984H18.36C16.848 6.984 16.56 7.704 16.56 8.748V11.064H20.16L19.692 14.664H16.56V24H22.68C22.853 24 23.025 23.966 23.185 23.899C23.345 23.833 23.491 23.736 23.613 23.613C23.736 23.491 23.833 23.345 23.899 23.185C23.966 23.025 24 22.853 24 22.68V1.32C24 1.147 23.966 .975 23.899 .815C23.833 .655 23.736 .509 23.613 .387C23.491 .264 23.345 .167 23.185 .1C23.025 .034 22.853 0 22.68 0Z"
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
            },
            {
              href: 'https://www.linkedin.com/company/melissa-data/',
              label: 'LinkedIn',
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
                    d="M20.451 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.355V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.114 20.452H3.558V9h3.556v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"
                  />
                </svg>
              )
            },
            {
              href: 'https://www.youtube.com/user/MelissaDataCorp/',
              label: 'YouTube',
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
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"
                  />
                </svg>
             )
            },
            {
              href: 'https://discord.gg/92bHmUSCBU',
              label: 'Discord',
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
                    d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z"
                  />
                </svg>
             )
            }


          ].map(({ href, label, svg }) => (
            <span>
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
            </span>
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