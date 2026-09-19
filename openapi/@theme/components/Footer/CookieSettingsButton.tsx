import React from 'react';
import styled from 'styled-components';

import type { JSX } from 'react';

import { breakpoints } from '@redocly/theme/core/utils';

declare global {
  interface Window {
    _hsp?: any[];
  }
}

export function CookieSettingsButton(): JSX.Element {
  return (
    <CookieItemWrapper data-component-name="Footer/CookieSettingsButton">
      <CookieLink
        type="button"
        id="hs_show_banner_button"
        onClick={() => {
          window._hsp = window._hsp || [];
          window._hsp.push(['showBanner']);
        }}
      >
        Cookie Preferences
      </CookieLink>
    </CookieItemWrapper>
  );
}

const CookieItemWrapper = styled.div`
  margin: var(--footer-link-padding-vertical) var(--footer-link-padding-horizontal);
`;

const CookieLink = styled.button`
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  cursor: pointer;
  color: var(--footer-link-text-color);
  text-decoration: none;
  text-align: center;
  display: block;
  width: 100%;

  &:hover {
    color: var(--footer-link-color-hover);
  }

  @media screen and (min-width: ${breakpoints.small}) {
    text-align: left;
  }
`;
