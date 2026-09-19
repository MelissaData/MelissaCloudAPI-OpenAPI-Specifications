import React from 'react';
import styled from 'styled-components';

import type { JSX } from 'react';
import type { ResolvedNavItem } from '@redocly/config';

import { FooterItem } from '@redocly/theme/components/Footer/FooterItem';
import { CookieSettingsButton } from '@redocly/theme/components/Footer/CookieSettingsButton';
import { breakpoints, isNavLinkItem } from '@redocly/theme/core/utils';
import { useThemeHooks } from '@redocly/theme/core/hooks';

export type FooterColumnProps = {
  column: ResolvedNavItem;
  className?: string;
};

export function FooterColumn({ column, className }: FooterColumnProps): JSX.Element {
  const { useTranslate } = useThemeHooks();
  const { translate } = useTranslate();
  const { items = [] } = column;

  const iconsOnly = items.every((item) => item.label === item.link && (item.icon || item.srcSet));
  const label = translate(column.labelTranslationKey, column.label);
  return (
    <FooterColumnWrapper data-component-name="Footer/FooterColumn" className={className}>
      {!isNavLinkItem(column) && <FooterColumnTitle>{label}</FooterColumnTitle>}
      <FooterColumnItems $iconsOnly={isNavLinkItem(column) ? false : iconsOnly}>
        {isNavLinkItem(column) ? (
          <NonGroupItem
            item={column}
            iconsOnly={Boolean(column?.label === column?.link && (column?.icon || column?.srcSet))}
            key={column.label}
            className="nonGroupFooterItem"
          />
        ) : (
          <>
            {items?.map((columnItem, columnItemIndex) => (
              <FooterItem item={columnItem} iconsOnly={iconsOnly} key={columnItemIndex} />
            ))}
            {label === 'Support' && <CookieSettingsButton />}
          </>
        )}
      </FooterColumnItems>
    </FooterColumnWrapper>
  );
}

const FooterColumnWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  flex-direction: column;
  text-align: center;
  word-break: break-word;
  min-width: var(--footer-column-min-width);
  align-content: center;
  flex-wrap: wrap;
  gap: var(--footer-column-title-gap);

  @media screen and (min-width: ${breakpoints.small}) {
    text-align: left;
    &:not(:last-child) {
      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 1px;
        height: 100%;
        background-color: var(--footer-column-divider-color);
        right: calc(0px - var(--footer-column-gap) / 2);
      }
    }
  }
`;

const FooterColumnTitle = styled.div`
  display: inline-block;
  font-weight: var(--footer-title-font-weight);
  font-size: var(--footer-title-font-size);
  margin-top: 0;
  color: var(--footer-title-text-color);
  margin-bottom: 0;

  a {
    text-decoration: none;
    color: var(--footer-title-text-color);

    &:hover {
      color: var(--footer-title-text-color-hover);
    }
  }
`;

const FooterColumnItems = styled.div<{ $iconsOnly?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: ${(props) => (props.$iconsOnly ? 'row' : 'column')};

  @media screen and (min-width: ${breakpoints.small}) {
    justify-content: flex-start;
  }
`;

const NonGroupItem = styled(FooterItem)`
  margin: 0;
`;