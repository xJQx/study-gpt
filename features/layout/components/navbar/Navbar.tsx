import React, { useState } from 'react';
import { NavbarContainer } from './NavbarContainer';
import { NavLogo } from './NavLogo';
import { MenuLinkProps } from './MenuLink';
import { MenuItems } from './MenuItems';
import { MenuToggle } from './MenuToggle';
import { NavDrawer } from './NavDrawer';

export interface NavBarProps {
  links: Array<MenuLinkProps>;
}

export const Navbar = ({ links }: NavBarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <NavbarContainer>
      <div className="flex flex-row gap-x-[25px] min-w-[auto] lg:min-w-full">
        <NavLogo />
        <MenuItems links={links} />
      </div>

      <MenuToggle toggle={setIsDrawerOpen} isOpen={isDrawerOpen} />
      <NavDrawer isOpen={isDrawerOpen} links={links} />
    </NavbarContainer>
  );
};
