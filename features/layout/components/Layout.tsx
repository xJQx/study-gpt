import React from 'react';
import { NavBarProps, Navbar } from './navbar';
import { Footer } from './footer';
import { TryNowRibbon } from '@/features/promo';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navbarProps: NavBarProps = {
    links: [
      { href: '/', label: 'Home' },
      { href: '/summarise', label: 'Summarise' },
      { href: '/explain', label: 'Explain' },
      { href: '/flash-card', label: 'Flash Card' }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar {...navbarProps} />

      {/* Body */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />

      {/* CTA Ribbon */}
      <TryNowRibbon href="/flash-card" />
    </div>
  );
};
