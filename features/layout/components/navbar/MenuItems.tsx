import React, { useState, useEffect } from 'react';
import { MenuLink, MenuLinkProps } from './MenuLink';
import { Button, ModalUser } from '@/components';
import Image from 'next/image';
import { useDisclosure } from '@chakra-ui/react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/config/FirebaseService';

interface MenuItemsProps {
  isOpen?: boolean;
  links: Array<MenuLinkProps>;
}

export const MenuItems = ({ isOpen = false, links }: MenuItemsProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState<any>(null);

  const {
    isOpen: isProfileModalOpen,
    onOpen: onProfileModalOpen,
    onClose: onProfileModalClose
  } = useDisclosure();

  const handleLogin = async () => {
    const googleAuth = new GoogleAuthProvider();
    await signInWithPopup(auth, googleAuth)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true);
        setCurrUser(user);
        localStorage.setItem('userId', user.uid);

        // console.log('user', user);
      } else {
        setIsLoggedIn(false);
        setCurrUser(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('apiKey');
      }
    });
  }, []);

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
            <Button onClick={() => handleLogin()}>Login</Button>
          ) : (
            <div
              className="relative w-[36px] h-[36px] cursor-pointer"
              onClick={onProfileModalOpen}
            >
              <Image
                src={currUser ? currUser.photoURL : '/misc/default-profile.jpg'}
                alt="profile picture"
                fill={true}
                className="rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <ModalUser
        useDisclosure={{
          isOpen: isProfileModalOpen,
          onClose: onProfileModalClose
        }}
        currUser={currUser}
      />
    </>
  );
};
