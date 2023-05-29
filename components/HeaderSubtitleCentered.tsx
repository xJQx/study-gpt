import React from 'react';

interface HeaderSubtitleCenteredProps {
  title: string;
  subTitle?: string;
}

export const HeaderSubtitleCentered = ({
  title,
  subTitle
}: HeaderSubtitleCenteredProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="font-bold text-2xl mb-2">{title}</h2>
      <p className="text-sm text-gray-500 font-bold">{subTitle}</p>
    </div>
  );
};
