import {
  textHoverLinearGradientClassName,
  textLinearGradientClassName
} from '@/styles/styles';
import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function History() {
  return (
    <div className="flex flex-col w-full h-[65vh] justify-center items-center">
      <Text
        className={`text-[20px] md:text-[24px] font-semibold ${textLinearGradientClassName}`}
      >
        Coming Soon...
      </Text>
      <Link
        href="/"
        className={`group flex flex-row justify-center items-center gap-2 mt-4 cursor-pointer ${textHoverLinearGradientClassName}`}
      >
        <FaArrowLeft className="w-[12px] h-[12px] text-black group-hover:text-brand-red group-hover:-translate-x-2 transition" />
        Go Back
      </Link>
    </div>
  );
}
