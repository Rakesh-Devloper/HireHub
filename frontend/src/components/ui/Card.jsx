import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glass = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        ${glass ? 'bg-white/95 dark:bg-slate-900/90 backdrop-blur-md' : 'bg-white dark:bg-slate-900'}
        border border-slate-200/80 dark:border-slate-800
        text-slate-900 dark:text-slate-100
        rounded-3xl
        shadow-xs
        ${
          hoverEffect
            ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 dark:hover:border-slate-700 cursor-pointer'
            : ''
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
