import React from 'react';

interface FlashCardContentProps {
  title: string;
  number?: string;
}

export const FlashCardContent = ({ title, number }: FlashCardContentProps) => {
  return (
    <div>
      <h3 className="font-bold text-2xl mb-4">{title}</h3>
      <p className="text-md text-gray-500">{number}</p>
    </div>
  );
};
