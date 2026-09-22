import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-b border-gray-200 py-4 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-lg p-2 transition-colors hover:bg-gray-50"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-semibold text-gray-900">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-teal-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-3 px-2 text-sm sm:text-base leading-relaxed text-gray-600 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};
