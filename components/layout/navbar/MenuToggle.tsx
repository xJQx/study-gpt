import React from 'react';
import { FaStream } from 'react-icons/fa';

interface MenuToggleProps {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <div
      className={`block lg:hidden text-brand-white p-[6px] ${
        isOpen ? 'bg-brand-red' : 'bg-brand-pink'
      } hover:bg-brand-red cursor-pointer rounded-md`}
      onClick={() => toggle(!isOpen)}
    >
      <FaStream className="h-6 w-6 m-[0px] lg:m-[2px]" />
    </div>
  );
};
