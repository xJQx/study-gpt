import React from 'react';
import { MenuLink, MenuLinkProps } from './MenuLink';
import Link from 'next/link';

interface MenuItemsProps {
  isOpen?: boolean;
  links: Array<MenuLinkProps>;
}

export const MenuItems = ({ isOpen = false, links }: MenuItemsProps) => {
  return (
    <div
      className={`${
        isOpen ? 'flex' : 'hidden'
      } lg:flex flex-col lg:flex-row justify-between basis-full md:basis-auto ml-0 lg:ml-10 w-full`}
    >
      {/* Links */}
      <div className="pt-0 space-x-0 lg:space-x-8 space-y-4 lg:space-y-0 flex flex-col lg:flex-row items-left lg:items-center justify-end font-bold">
        {links.map(link => (
          <MenuLink key={link.label} label={link.label} href={link.href} />
        ))}
      </div>

      {/* CTA Button -> Contact */}
      <Link
        href="/contact"
        className="bg-brand-pink hover:bg-brand-red text-white px-[16px] py-[10px] mt-8 lg:mt-0 w-max block"
      >
        <div className="block">Contact</div>
      </Link>
    </div>
  );
};