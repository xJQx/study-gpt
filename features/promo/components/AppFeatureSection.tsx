import { ButtonLink } from '@/components';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface AppFeatureSectionProps {
  index: string;
  title: string;
  img: {
    src: string;
    alt: string;
  };
  description: string;
  href: string;
}

export const AppFeatureSection = (props: AppFeatureSectionProps) => {
  const {
    index,
    title,
    img: { src, alt },
    description,
    href
  } = props;

  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ opacity: 0, translateY: 200 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      {/* Section Title */}
      <div className="mb-[16px] text-[32px]">
        <span className="text-brand-pink font-bold">{index}&nbsp;</span>
        <span className="font-semibold">{title}</span>
      </div>
      {/* Section Content */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-12 space-y-8 md:space-y-0">
        {/* Image */}
        <div className="relative w-[100%] md:w-[50%] h-[250px] md:h-[480px]">
          <Image
            src={src}
            alt={alt}
            fill={true}
            style={{ objectFit: 'contain' }}
          />
        </div>
        {/* Content */}
        <div className="flex flex-col justify-center space-y-0 md:space-y-8 w-[100%] md:w-[50%]">
          <div className="text-[18px]">{description}</div>
          <div className="">
            <ButtonLink label="Try Now" href={href} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
