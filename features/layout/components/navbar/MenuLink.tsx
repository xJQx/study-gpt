import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface MenuLinkProps {
  label: string;
  href: string;
}

export const MenuLink = ({ label, href }: MenuLinkProps) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={router?.pathname === href ? 'text-brand-red' : 'text-black'}
    >
      <span className="block font-light text-[16px] hover:text-brand-red focus:text-brand-red">
        {label}
      </span>
    </Link>
  );
};
