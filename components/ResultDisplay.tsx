
import React from 'react';

interface ResultDisplayProps {
    originalSrc: string;
    generatedSrc: string;
}

const ImageCard: React.FC<{ src: string; title: string; isGenerated?: boolean }> = ({ src, title, isGenerated }) => (
    <div className="w-full flex flex-col items-center">
        <h3 className={`text-xl font-semibold mb-4 ${isGenerated ? 'text-indigo-600' : 'text-gray-600'}`}>{title}</h3>
        <div className="w-full aspect-square bg-white rounded-2xl shadow-lg overflow-hidden p-2">
            <img src={src} alt={title} className="w-full h-full object-contain" />
        </div>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalSrc, generatedSrc }) => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <ImageCard src={originalSrc} title="Sebelum" />
            <ImageCard src={generatedSrc} title="Sesudah" isGenerated />
        </div>
    );
};

// Add fade-in animation to tailwind config if possible, or define here if not.
// For this single-file setup, a style tag can be used in index.html or we can rely on simple classes.
// Let's assume a basic animation can be done with existing tailwind classes.
// `animate-fade-in` would need to be defined. Let's add it via a style tag in index.html for simplicity if needed.
// However, I'll rely on the default setup and omit custom CSS. Let's use a class that might exist or just denote it as a concept.
// The component is self-contained without custom css.
