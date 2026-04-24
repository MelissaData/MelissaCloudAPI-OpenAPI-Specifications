import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import type { JSX } from 'react';
import type { ResolvedNavItem, ResolvedNavLinkItem, ResolvedNavGroupItem } from '@redocly/config';
import type { LinkProps } from '@redocly/theme/components/Link/Link';

import { DropdownMenu } from '@redocly/theme/components/Dropdown/DropdownMenu';
import { DropdownMenuItem } from '@redocly/theme/components/Dropdown/DropdownMenuItem';
import {
  getPathnameForLocale,
  withPathPrefix,
  removeTrailingSlash,
} from '@redocly/theme/core/utils';
import { useThemeHooks } from '@redocly/theme/core/hooks';
import { LaunchIcon } from '@redocly/theme/icons/LaunchIcon/LaunchIcon';
import { Link } from '@redocly/theme/components/Link/Link';
import { Dropdown } from '@redocly/theme/components/Dropdown/Dropdown';
import { GenericIcon } from '@redocly/theme/icons/GenericIcon/GenericIcon';
import { Button } from '@redocly/theme/components/Button/Button';

export type NavbarItemProps = {
  navItem: ResolvedNavItem;
  className?: string;
};

export function NavbarItem({ navItem, className }: NavbarItemProps): JSX.Element | null {
  const { pathname } = useLocation();
  const { useTranslate, useL10nConfig, useTelemetry } = useThemeHooks();
  const { translate } = useTranslate();
  const { defaultLocale, currentLocale, locales } = useL10nConfig();
  const telemetry = useTelemetry();

  if (navItem.type !== 'link' && !navItem.items) return null;

  const item = navItem as ResolvedNavLinkItem;
  const normalizedPath = (item.link ? removeTrailingSlash(item.link) : item.link) || '';

  const pathWithPathPrefix = withPathPrefix(
    getPathnameForLocale(normalizedPath, defaultLocale, currentLocale, locales),
  );

  const isActive = removeTrailingSlash(pathname) === removeTrailingSlash(pathWithPathPrefix);

  const itemContent = (
    <NavbarMenuItem
      as={item.link ? Link : undefined}
      active={isActive}
      className={className}
      onClick={() => telemetry.sendNavbarMenuItemClickedMessage({ type: item.type })}
      external={item.external}
      target={item.target}
      to={item.link}
    >
      <NavbarIcon icon={item.icon} srcSet={item.srcSet} />
      <NavbarLabel data-translation-key={item.labelTranslationKey}>
        {translate(item.labelTranslationKey, item.label)}
      </NavbarLabel>
      {item.external ? <ExternalLinkIcon size="10px" /> : null}
    </NavbarMenuItem>
  );

  if ((navItem as ResolvedNavGroupItem).items) {
    const item = navItem as ResolvedNavGroupItem;
    const groupItems = item.items as ResolvedNavItem[];
    const groupItemsComponents = groupItems.map((item, index) => {
      if (item.type !== 'link' && item.type !== 'separator') return null;
      return (
        <DropdownMenuItem
          key={`${item.label}_${index}`}
          to={item.link}
          separator={item.type === 'separator'}
          separatorLine={item.separatorLine}
          data-translation-key={item.labelTranslationKey}
          external={item.external}
        >
          <NavbarIcon icon={item.icon} srcSet={item.srcSet} />
          <NavbarLabel data-translation-key={item.labelTranslationKey}>
            {translate(item.labelTranslationKey, item.label)}
          </NavbarLabel>
          {item.external ? <ExternalLinkIcon size="10px" /> : null}
        </DropdownMenuItem>
      );
    });

    const handleGroupTriggerKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.currentTarget.click();
      }
      // Enter/Space will trigger a native click on button
    };

    const groupTrigger = (
      <NavbarMenuTriggerButton
        variant="text"
        type="button"
        className={className}
        aria-haspopup="menu"
        onKeyDown={handleGroupTriggerKeyDown}
      >
        <NavbarLabel data-translation-key={item.labelTranslationKey}>
          {translate(item.labelTranslationKey, item.label)}
        </NavbarLabel>
        <NavbarIcon icon={item.icon} srcSet={item.srcSet} />
      </NavbarMenuTriggerButton>
    );

    return (
      <li>
        <div data-component-name="Navbar/NavbarItem">
          <NavbarMenuItemDropdown trigger={groupTrigger} triggerEvent="click" withArrow={true}>
            <DropdownMenu>
              <li>
                {groupItemsComponents}
              </li>
            </DropdownMenu>
          </NavbarMenuItemDropdown>
        </div>
      </li>
    );
  }

  return <li><div data-component-name="Navbar/NavbarItem">{itemContent}</div></li>;
}

const NavbarMenuItemDropdown = styled(Dropdown)`
  --dropdown-menu-item-separator-font-size: var(--navbar-separator-font-size);
  --dropdown-menu-item-separator-text-color: var(--navbar-separator-text-color);
  --dropdown-menu-item-separator-line-height: var(--navbar-separator-line-height);
`;

const NavbarMenuItem = styled.li<LinkProps & { active?: boolean }>`
  display: inline-block;
  padding: var(--navbar-item-padding);
  text-align: center;
  line-height: var(--navbar-item-line-height);
  font-weight: var(--navbar-item-font-weight);

  border-radius: var(--navbar-item-border-radius);
  border-bottom: ${({ active }: { active?: boolean }) =>
    active ? 'var(--navbar-item-bottom-border-active)' : 'var(--navbar-item-bottom-border)'};

  background: ${({ active }: { active?: boolean }) => active && 'var(--navbar-item-bg-color-active)'};
  color: ${({ active }: { active?: boolean }) =>
    active ? 'var(--navbar-item-text-color-active)' : 'var(--navbar-text-color)'};
  text-decoration: ${({ active }: { active?: boolean }) =>
    active ? 'var(--navbar-item-text-decoration-active)' : 'none'};

  &:hover {
    color: var(--navbar-item-text-color-hover);
    text-decoration: var(--navbar-item-text-decoration-hover);
    border-bottom: ${({ active }: { active?: boolean }) => !active && 'var(--navbar-item-bottom-border-hover)'};
    background: ${({ active }: { active?: boolean }) =>
      active ? 'var(--navbar-item-bg-color-active)' : 'var(--navbar-item-bg-color-hover)'};
  }
`;

const NavbarMenuTriggerButton = styled(Button)`
  padding: var(--navbar-item-padding);
  line-height: var(--navbar-item-line-height);
  border-radius: var(--navbar-item-border-radius);
  color: var(--navbar-text-color);
  &:hover {
    color: var(--navbar-item-text-color-hover);
    background: var(--navbar-item-bg-color-hover);
  }
`;

const NavbarLabel = styled.span`
  cursor: pointer;
  vertical-align: middle;
`;

const NavbarIcon = styled(GenericIcon)`
  --icon-width: var(--navbar-item-icon-width);
  --icon-height: var(--navbar-item-icon-height);
  margin-right: var(--navbar-item-icon-margin-right);
  margin-left: var(--navbar-item-icon-margin-left);
`;

const ExternalLinkIcon = styled(LaunchIcon)`
  margin-left: 5px;
`;
