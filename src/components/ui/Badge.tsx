import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'teal' | 'navy' | 'amber' | 'emerald' | 'gray';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'teal',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';

  const variantStyles = {
    teal: 'bg-teal-100 text-teal-800',
    navy: 'bg-slate-800 text-slate-100',
    amber: 'bg-amber-100 text-amber-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    gray: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
