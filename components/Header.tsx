
import React from 'react';

const SparklesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-12h4M12 3v4m7 5h4m-2-2v4m-1-12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <SparklesIcon />
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        AI Product Photo Pro
                    </h1>
                </div>
            </div>
        </header>
    );
};
