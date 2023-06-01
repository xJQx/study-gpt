import React from 'react';

interface FlashCardProps {
  title: string;
  subtitle?: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

export const FlashCard = (props: FlashCardProps) => {
  const { title, subtitle, leftButton, rightButton } = props;

  return (
    <div id="flash-card">
      <h3 className="font-bold text-2xl mb-4">{title}</h3>
      <p className="text-md text-gray-500">{subtitle}</p>

      {/* Buttons */}
      <div className="flex flex-row mt-8 min-w-full justify-between">
        <div>{leftButton}</div>
        <div>{rightButton}</div>
      </div>
    </div>
  );
};
