import { bgLinearGradientClassName } from '@/styles/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface TryNowRibbonProps {
  href: string;
}

export const TryNowRibbon = ({ href }: TryNowRibbonProps) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={`top-1/2 right-[-24px] -rotate-90 w-max px-3 py-2 text-white font-bold ${bgLinearGradientClassName} ${
        router.pathname === '/' ? 'fixed' : 'hidden'
      }`}
    >
      Try Now
    </Link>
  );
};
