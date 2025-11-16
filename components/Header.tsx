
import React from 'react';

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        <path d="M4 4L6 8" />
        <path d="M18 16L20 20" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <SparkleIcon />
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              Startup Spark India
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
