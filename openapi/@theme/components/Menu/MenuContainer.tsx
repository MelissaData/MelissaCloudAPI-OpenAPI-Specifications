import React from 'react';
import styled, { keyframes } from 'styled-components';

import type { JSX, PropsWithChildren } from 'react';
import type { MenuItemsAnimation } from '@redocly/theme/core/types';

export type MenuContainerProps = PropsWithChildren<{
  growContent?: boolean;
  className?: string;
  hidden?: boolean;
  animation?: MenuItemsAnimation;
}>;

export function MenuContainer(props: MenuContainerProps): JSX.Element {
  return <MenuContainerComponent {...props} data-component-name="Menu/MenuContainer" />;
}

const slideInRightAnimation = keyframes`
  0% {
    transform: translateX(100%)
  }
  100% {
    transform: translateX(0%)
  }
`;

const slideInLeftAnimation = keyframes`
  0% {
    transform: translateX(-100%)
  }
  100% {
    transform: translateX(0%)
  }
`;

const MenuContainerComponent = styled.div.attrs<MenuContainerProps>(
  ({ growContent, className, animation }) => ({
    growContent: growContent === undefined ? true : growContent,
    className,
    animation,
  }),
)<MenuContainerProps>`
  animation-name: ${({ animation }) =>
    animation === 'slideInRight'
      ? slideInRightAnimation
      : animation === 'slideInLeft'
        ? slideInLeftAnimation
        : 'none'};
  animation-fill-mode: forwards;
  animation-duration: 0.3s;
  animation-timing-function: ease;
  position: relative;
  overflow-y: auto;
  flex-grow: ${({ growContent }) => (growContent ? 1 : 0)};
  padding-top: var(--menu-container-padding-top);
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
  overscroll-behavior: contain;
`;
