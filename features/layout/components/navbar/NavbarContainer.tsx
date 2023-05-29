import React from 'react';

interface NavbarContainerProps {
  children: React.ReactNode;
}

export const NavbarContainer = ({ children }: NavbarContainerProps) => {
  return (
    <div
      role="navigation"
      className="flex items-center justify-between max-w-screen px-8 py-6"
    >
      {children}
    </div>
  );
};
