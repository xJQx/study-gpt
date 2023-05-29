import React from 'react';

interface FlashCardContentProps {
    title: string,
    paragraph?: string
}

export const FlashCardContent = ({ title, paragraph }: FlashCardContentProps) => {
    return (
        <div>
            <h2 className='font-bold text-2xl mb-4'>{ title }</h2>
            <p>{ paragraph }</p>
        </div>
    );
};