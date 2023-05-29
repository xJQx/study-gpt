import React from 'react';

interface FlashCardContentProps {
    title: string,
    paragraph?: string
}

export const FlashCardContent = ({ title, paragraph }: FlashCardContentProps) => {
    return (
        <div>
            <h3 className='font-bold text-2xl mb-4'>{ title }</h3>
            <p>{ paragraph }</p>
        </div>
    );
};