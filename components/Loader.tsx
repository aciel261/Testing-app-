
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-8 h-[calc(100vh-10rem)] min-h-[500px]">
      <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
      <h3 className="text-2xl font-bold text-gray-700 mb-2">AI Sedang Bekerja...</h3>
      <p className="text-gray-500 text-center max-w-sm">
        Harap tunggu sebentar. Kami sedang membuat foto produk profesional Anda.
      </p>
    </div>
  );
};
