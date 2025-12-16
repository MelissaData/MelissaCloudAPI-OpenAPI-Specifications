import React from 'react';
import styled from 'styled-components';

import type { JSX } from 'react';
import type { ResolvedConfigLinks } from '@redocly/config';

import { breakpoints } from '@redocly/theme/core/utils';
import { useThemeHooks, useThemeConfig, useMobileMenu } from '@redocly/theme/core/hooks';
import { NavbarLogo } from '@redocly/theme/components/Navbar/NavbarLogo';
import { NavbarMenu } from '@redocly/theme/components/Navbar/NavbarMenu';
import { MenuMobile } from '@redocly/theme/components/Menu/MenuMobile';
import { ColorModeSwitcher } from '@redocly/theme/components/ColorModeSwitcher/ColorModeSwitcher';
import { Search } from '@redocly/theme/components/Search/Search';
import { UserMenu } from '@redocly/theme/components/UserMenu/UserMenu';
import { LanguagePicker } from '@redocly/theme/components/LanguagePicker/LanguagePicker';
import { ProductPicker } from '@redocly/theme/components/Product/ProductPicker';
import { Button } from '@redocly/theme/components/Button/Button';
import { MenuIcon } from '@redocly/theme/icons/MenuIcon/MenuIcon';
import { CloseIcon } from '@redocly/theme/icons/CloseIcon/CloseIcon';

export type NavbarProps = {
  className?: string;
};

export function Navbar({ className }: NavbarProps): JSX.Element | null {
  const { isOpen, closeMobileMenu, openMobileMenu } = useMobileMenu(false);
  const themeConfig = useThemeConfig();
  const { useL10n, useTelemetry } = useThemeHooks();
  const { changeLanguage } = useL10n();
  const telemetry = useTelemetry();

  const menu = themeConfig.navbar?.items;

  const { search: searchSettings, navbar, userMenu: userMenuSettings, logo } = themeConfig;

  if (navbar?.hide) {
    return null;
  }

  const hideSearch =
    searchSettings?.hide || (searchSettings?.placement && searchSettings?.placement !== 'navbar');
  const hideUserMenu = userMenuSettings?.hide;

  return (
    <NavbarWrapper data-component-name="Navbar/Navbar" className={className}>
      {isOpen && <MenuMobile hideUserProfile={!!hideUserMenu} />}
      <NavbarRow>
        {logo && <NavbarLogo config={logo} />}
        <ProductPicker />
        {menu && <NavbarMenu menuItems={menu as ResolvedConfigLinks} />}
        <ColorModeSwitcher />
        {hideSearch ? null : <Search />}
        <LanguagePicker onChangeLanguage={changeLanguage} onlyIcon alignment="end" />
        <select
          aria-label="My Account"
          title="Open Melissa account links"
          defaultValue=""
          data-testid="account-links"
          onChange={(e) => {
            const url = e.currentTarget.value;
            if (url) {
              window.open(url, '_blank', 'noopener,noreferrer');
              e.currentTarget.selectedIndex = 0; // reset to placeholder
            }
          }}
          style={{
            padding: '4px 8px',
            background: 'var(--navbar-bg-color)',
            color: 'var(--text-color)',
            border: '1px solid var(--border-color, #ccc)',
            borderRadius: 4,
            font: 'inherit',
            cursor: 'pointer',
          }}
        >
          <option value="" disabled hidden>My Account</option>
          <option value="https://apps.melissa.com/user/signin.aspx">Sign In</option>
          <option value="https://apps.melissa.com/user/user_account.aspx">My Account</option>
          <option value="https://www.melissa.com/pricing#purchase-credits">Buy Credits</option>
          <option value="https://www.melissa.com/pricing/developer">Credit Costs</option>
          <option value="https://www.melissa.com/company/product-support">Support Center</option>
        </select>
        <MobileMenuButton
          variant="text"
          data-testid="mobile-menu-button"
          onClick={
            isOpen
              ? () => {
                  closeMobileMenu();
                  telemetry.sendMobileMenuButtonCloseClickedMessage();
                }
              : () => {
                  openMobileMenu();
                  telemetry.sendMobileMenuButtonOpenClickedMessage();
                }
          }
          icon={isOpen ? <CloseIcon /> : <MenuIcon />}
          aria-label={isOpen ? 'Close menu button' : 'Open menu button'}
        />
        {hideUserMenu ? null : <UserMenu />}
      </NavbarRow>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  --text-color: var(--navbar-text-color);

  position: sticky;
  display: flex;
  top: 0;
  height: var(--navbar-height);
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
  padding: var(--navbar-padding);
  border: var(--navbar-border);
  font-size: var(--navbar-font-size);
  font-family: var(--navbar-font-family);
  z-index: var(--z-index-raised);
  background: var(--navbar-bg-color);

  @media print {
    background: transparent;
    display: none;
    > :not(a, img) {
      display: none !important;
    }
    img {
      padding: 0;
      margin: 0;
    }
  }
`;

const NavbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  max-width: var(--navbar-container-max-width);

  @media screen and (min-width: ${breakpoints.max}) {
    max-width: var(--container-max-width);
    margin-left: auto;
    margin-right: auto;
  }
`;

const MobileMenuButton = styled(Button)`
  margin-left: 0px !important;

  @media screen and (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;
