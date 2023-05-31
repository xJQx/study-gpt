import React from 'react';
import { NavBarProps, Navbar } from './navbar';
import { Footer } from './footer';
import { TryNowRibbon } from '@/features/promo';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { publicFilePath } from '@/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="author"
          content="Jing Qiang | Siang Meng | Tze Yeong | Yan Tat"
        />
        <meta name="title" content="StudyGPT" />
        <meta
          name="description"
          content="Your Powerful All-In-One Learning Companion Powered by ChatGPT"
        />

        {/* Icons */}
        <link
          rel="apple-touch-icon"
          href={publicFilePath('apple-touch-icon.png')}
        />
        {/* https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/512/external-fox-origami-vitaliy-gorbachev-blue-vitaly-gorbachev.png */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={publicFilePath('/favicon-32x32.png')}
        />

        <title>StudyGPT</title>
      </Head>

      <div className="min-h-screen">
        {/* Toaster */}
        <Toaster />

        {/* Navbar */}
        <Navbar {...navbarProps} />

        {/* Body */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />

        {/* CTA Ribbon */}
        <TryNowRibbon href="/flash-card" />
      </div>
    </>
  );
};

const navbarProps: NavBarProps = {
  links: [
    { href: '/', label: 'Home' },
    { href: '/summarise', label: 'Summarise' },
    { href: '/explain', label: 'Explain' },
    { href: '/flash-card', label: 'Flash Card' }
  ]
};
