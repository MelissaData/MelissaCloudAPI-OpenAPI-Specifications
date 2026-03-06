import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import type { ItemState, MenuItemProps } from '@redocly/theme/core/types';
import type { JSX, KeyboardEvent } from 'react';

import { useNestedMenu, useThemeHooks } from '@redocly/theme/core/hooks';
import { LaunchIcon } from '@redocly/theme/icons/LaunchIcon/LaunchIcon';
import { Link } from '@redocly/theme/components/Link/Link';
import { ChevronDownIcon } from '@redocly/theme/icons/ChevronDownIcon/ChevronDownIcon';
import { ChevronRightIcon } from '@redocly/theme/icons/ChevronRightIcon/ChevronRightIcon';
import { HttpTag } from '@redocly/theme/components/Tags/HttpTag';
import { MenuItemType } from '@redocly/theme/core/constants';
import { getMenuItemType, getOperationColor } from '@redocly/theme/core/utils';
import { ArrowRightIcon } from '@redocly/theme/icons/ArrowRightIcon/ArrowRightIcon';
import { Badge } from '@redocly/theme/components/Badge/Badge';
import { GenericIcon } from '@redocly/theme/icons/GenericIcon/GenericIcon';

export function MenuItem(props: React.PropsWithChildren<MenuItemProps>): JSX.Element {
  const { item, depth, className, onClick } = props;
  const { useTranslate, useTelemetry } = useThemeHooks();
  const { translate } = useTranslate();
  const type = getMenuItemType(item);
  const nestedMenuRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLIElement>(null);
  const { isExpanded, canUnmount, style, handleExpand } = useNestedMenu({
    ...props,
    type,
    labelRef,
    nestedMenuRef,
  });
  const telemetry = useTelemetry();
  const isDrilldown = type === MenuItemType.DrillDown;
  const isSeparator = type === MenuItemType.Separator;
  const isNested = type === MenuItemType.Group;
  const hasChevron = isNested && !isDrilldown;
  const hasHttpTag = !!item.httpVerb || type === MenuItemType.Operation;

  const handleOnClick = () => {
    telemetry.sendSidebarItemClickedMessage([
      {
        object: 'sidebar_item',
        label: item.label,
        type: item.type === 'link' || item.type === 'group' ? item.type : undefined,
      },
    ]);
    onClick?.();
    if (isNested) {
      handleExpand();
    }
  };

  const handleExpandOnEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnClick();
    }
  };

  const chevron = hasChevron ? (
    isExpanded ? (
      <ChevronDownIcon
        size="var(--menu-item-label-chevron-size)"
        color="--tree-content-color-default"
      />
    ) : (
      <ChevronRightIcon
        size="var(--menu-item-label-chevron-size)"
        color="--tree-content-color-default"
      />
    )
  ) : null;

  const httpColor = getOperationColor({
    isAdditionalOperation: item.isAdditionalOperation,
    deprecated: item.deprecated,
    httpVerb: item.httpVerb || '',
  });

  const label = item.label && (
    <MenuItemLabelWrapper
    active={item.active}
    deprecated={item.deprecated}
    depth={depth}
    withChevron={hasChevron}
    isSeparator={isSeparator}
    onClick={handleOnClick}
    onKeyDown={handleExpandOnEnter}
    ref={labelRef}
    role={item.link ? 'none' : 'link'}
    tabIndex={!item.link ? 0 : undefined}
    data-testid="menu-item-label"
    data-active={item.active}
    >
    {hasChevron ? <ChevronWrapper>{chevron}</ChevronWrapper> : null}
    <MenuItemIcon icon={item.icon} srcSet={item.srcSet} />
    <MenuItemLabelTextWrapper>
        <MenuItemLabel>
        <span>{translate(item.labelTranslationKey, item.label)}</span>
        {item.badges?.map(({ name, color }) => (
            <MenuItemBadge color={color} key={name}>
            {name}
            </MenuItemBadge>
        ))}
        {item.external ? <LaunchIcon size="var(--menu-item-external-icon-size)" /> : null}
        </MenuItemLabel>
        {item.sublabel ? (
        <MenuItemSubLabel>
            {translate(item.subLabelTranslationKey, item.sublabel)}
        </MenuItemSubLabel>
        ) : null}
    </MenuItemLabelTextWrapper>

    {isDrilldown ? <ArrowRightIcon size="12px" /> : null}
    {hasHttpTag ? (
        <HttpTag color={httpColor || ''}>
        {item.httpVerb === 'hook' ? 'event' : item.httpVerb}
        </HttpTag>
    ) : null}
    </MenuItemLabelWrapper>
  );

  return (
    <li>
      <MenuItemWrapper
        data-component-name="Menu/MenuItem"
        className={generateClassName({ type, item, className })}
      >
        {item.link ? (
          <MenuItemLink
            to={item.link}
            external={item.external}
            target={item.target}
            languageInsensitive={item.languageInsensitive}
            onKeyDown={handleExpandOnEnter}
          >
            {label}
          </MenuItemLink>
        ) : (
          label
        )}
        {isNested ? (
          <MenuItemNestedWrapper depth={depth} ref={nestedMenuRef} style={style}>
            {isExpanded || !canUnmount ? props.children : null}
          </MenuItemNestedWrapper>
        ) : null}
        {item.separatorLine ? (
          <MenuItemSeparatorLine depth={depth} linePosition={item.linePosition} />
        ) : null}
      </MenuItemWrapper>
    </li>
  );
}

function generateClassName({
  type,
  item,
  className,
}: {
  type: MenuItemType;
  item: ItemState;
  className?: string;
}) {
  const classNames = [className, `menu-item-type-${type}`];

  if (type === MenuItemType.Separator) {
    classNames.push(`menu-item-type-${type}-${item.variant || 'primary'}`);
  }

  if (item.menuStyle === 'drilldown-header') {
    classNames.push(`menu-item-type-drilldown-header`);
    if (item.link) {
      classNames.push(`menu-item-type-drilldown-header-link`);
    }
  }

  return classNames
    .filter((className) => className)
    .join(' ')
    .trim();
}

const ChevronWrapper = styled.div`
  flex-shrink: 0;
`;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--menu-item-bg-color);
  font-family: var(--menu-item-font-family);
  font-size: var(--menu-item-font-size);
  font-weight: var(--menu-item-font-weight);
  line-height: var(--menu-item-line-height);
  color: var(--menu-item-text-color);

  .tag-http {
    align-self: flex-start;
    margin-left: auto;
  }

  &.menu-item-type-separator {
    pointer-events: none;
  }

  > a {
    text-decoration: none;
    color: var(--menu-item-text-color);
  }
`;

const MenuItemNestedWrapper = styled.div<{
  isExpanded?: boolean;
  depth?: number;
}>`
  order: 1;
  position: relative;

  &:hover:has(&:hover)::before {
    display: none;
  }

  &:hover::before {
    content: '';
    position: absolute;
    bottom: var(--spacing-unit);
    top: 0;
    z-index: var(--z-index-surface);
    left: ${({ depth }) =>
      `calc(
        var(--menu-item-label-margin-horizontal) +
        var(--menu-item-padding-horizontal) +
        (var(--menu-item-label-chevron-size) / 2 - 1px) +
        var(--menu-item-nested-offset) * ${depth})
      `};
    border: 0.5px solid var(--border-color-primary);
  }
`;

const MenuItemLabelWrapper = styled.li<{
  active?: boolean;
  depth?: number;
  withChevron?: boolean;
  deprecated?: boolean;
  isSeparator?: boolean;
}>`
  display: flex;
  position: relative;
  cursor: pointer;
  order: 1;
  align-items: var(--menu-item-label-align-items);
  transition: var(--menu-item-label-transition);
  word-break: var(--menu-item-label-word-break);
  border-radius: var(--menu-item-label-border-radius);
  margin: var(--menu-item-label-margin);
  padding: var(--menu-item-label-padding);
  gap: var(--menu-item-label-gap);

  padding-left: ${({ withChevron, depth, isSeparator }) =>
    `calc(
      var(--menu-item-padding-horizontal) +
      ${!withChevron ? 'var(--menu-item-label-chevron-offset) + ' + (isSeparator ? 'var(--menu-item-separator-offest)' : '0px') : '0px'} +
      ${depth ? 'var(--menu-item-nested-offset) * ' + depth : '0px'}
    )`};

  ${({ active, deprecated }) =>
    active &&
    css`
      color: ${deprecated ? 'var(--menu-content-color-disabled)' : 'var(--menu-item-color-active)'};
      background-color: var(--menu-item-bg-color-active);

      ${ChevronDownIcon} path {
        fill: var(--menu-item-color-active);
      }
      ${ChevronRightIcon} path {
        fill: var(--menu-item-color-active);
      }

      &:hover {
        background: var(--menu-item-bg-color-active);
      }
    `};

  ${({ deprecated }) =>
    deprecated &&
    css`
      color: var(--menu-content-color-disabled);

      &:hover {
        color: var(--menu-content-color-disabled);
      }
    `};

  &:hover {
    color: var(--menu-item-color-hover);
    background: var(--menu-item-bg-color-hover);

    ${ChevronDownIcon} path {
      fill: var(--menu-item-color-hover);
    }
    ${ChevronRightIcon} path {
      fill: var(--menu-item-color-hover);
    }
  }

  &:active {
    color: var(--menu-item-color-active);
    background: var(--menu-item-bg-color-active);

    ${ChevronDownIcon} path {
      fill: var(--menu-item-color-active);
    }
    ${ChevronRightIcon} path {
      fill: var(--menu-item-color-active);
    }
  }

  &:empty {
    padding: 0;
  }
`;

const MenuItemLabelTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MenuItemSubLabel = styled.div`
  margin: var(--menu-item-sublabel-margin);
  color: var(--menu-item-sublabel-text-color);
  font-weight: var(--menu-item-sublabel-font-weight);
  font-size: var(--menu-item-sublabel-font-size);
  font-family: var(--menu-item-sublabel-font-family);
`;

const MenuItemIcon = styled(GenericIcon)`
  --icon-width: var(--menu-item-icon-size);
  --icon-height: var(--menu-item-icon-size);
  margin: var(--menu-item-icon-margin);
  flex-shrink: 0;
  overflow: hidden;
`;

const MenuItemLink = styled(Link)`
  order: 1;
`;

const MenuItemSeparatorLine = styled.div<{ depth?: number; linePosition?: string }>`
  height: var(--menu-item-separator-line-height);
  background-color: var(--menu-item-separator-line-bg-color);
  margin: ${({ depth }) => `
    var(--menu-item-padding-vertical)
    var(--sidebar-margin-horizontal)
    var(--menu-item-padding-vertical)
    calc(var(--sidebar-margin-horizontal) +
    ${depth ? 'var(--menu-item-nested-offset) * ' + depth : '0px'})
  `};
  order: ${({ linePosition }) => (linePosition === 'top' ? 0 : 1)};
`;

const MenuItemLabel = styled.span`
  & > * {
    margin-right: var(--spacing-xxs);
  }
`;

const MenuItemBadge = styled(Badge)<{ color?: string }>`
  margin-left: 0;
  background-color: ${({ color }) => color || 'var(--color-info-base)'};
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  padding: 0 var(--spacing-xxs);
  max-width: 80px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
