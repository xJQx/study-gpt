import { textLinearGradientClassName } from '@/styles/styles';
import Link from 'next/link';
import React from 'react';

export const NavLogo = () => {
  return (
    <div
      className={`flex items-center font-bold text-[24px] ${textLinearGradientClassName}`}
    >
      <Link href="/">StudyGPT</Link>
    </div>
  );
};
