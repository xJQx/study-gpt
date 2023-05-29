import React, { useState } from 'react';
import { MenuLink, MenuLinkProps } from './MenuLink';
import { Button } from '@/components';
import Image from 'next/image';
import { useDisclosure } from '@chakra-ui/react';
import { UserModal } from '../UserModal';

interface MenuItemsProps {
  isOpen?: boolean;
  links: Array<MenuLinkProps>;
}

export const MenuItems = ({ isOpen = false, links }: MenuItemsProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    isOpen: isProfileModalOpen,
    onOpen: onProfileModalOpen,
    onClose: onProfileModalClose
  } = useDisclosure();

  return (
    <>
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

        {/* CTA Button -> Login / Profile */}
        <div className="mt-4 lg:mt-0">
          {!isLoggedIn ? (
            <Button onClick={() => setIsLoggedIn(true)}>Login</Button>
          ) : (
            <div
              className="relative w-[36px] h-[36px] cursor-pointer"
              onClick={onProfileModalOpen}
            >
              <Image
                src="/person.jpg"
                alt="profile picture"
                fill={true}
                className="rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <UserModal
        useDisclosure={{
          isOpen: isProfileModalOpen,
          onClose: onProfileModalClose
        }}
      />
    </>
  );
};
