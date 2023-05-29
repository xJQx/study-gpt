import React from 'react';
import { MenuItems } from './MenuItems';
import { MenuLinkProps } from './MenuLink';

interface NavDrawerProps {
  isOpen: boolean;
  links: Array<MenuLinkProps>;
}

export const NavDrawer = ({ isOpen, links }: NavDrawerProps) => {
  return (
    <div
      className={`${
        isOpen ? 'block lg:hidden absolute top-16 right-8' : 'hidden'
      } lg:relative lg:top-0 lg:right-0 z-50`}
    >
      <div className="bg-brand-neutral px-6 py-4 rounded-md">
        <MenuItems links={links} isOpen={isOpen} />
      </div>
    </div>
  );
};
