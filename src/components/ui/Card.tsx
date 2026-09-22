import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glassmorphic?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  hoverable = false,
  glassmorphic = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'rounded-2xl border p-6 transition-all duration-300';
  const glassStyles = glassmorphic
    ? 'bg-white/80 backdrop-blur-md border-gray-100 shadow-lg'
    : 'bg-white border-gray-100 shadow-md';
  const hoverStyles = hoverable ? 'hover:-translate-y-1 hover:shadow-xl hover:border-teal-200' : '';

  return (
    <div
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
