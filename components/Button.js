import React from 'react';
import { CorrectIcon, WrongIcon } from './Icons';

export default function Button({
  icon,
  className,
  handleClick,
  children,
  disabled,
}) {
  return (
    <div>
      <button
        className={`btn md:px-16 ${className}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
        {icon === 'tick' && <CorrectIcon />}
        {icon === 'cross' && <WrongIcon />}
      </button>
    </div>
  );
}
