
import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
    onFileChange: (file: File | null) => void;
    imageUrl: string | null;
}

const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileChange, imageUrl }) => {
    const [isDragging, setIsDragging] = useState(false);
    
    const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);
    
    const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFileChange(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    }, [onFileChange]);
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileChange(e.target.files[0]);
        }
    };

    return (
        <div className="w-full">
            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileSelect}
            />
            <label
                htmlFor="file-upload"
                className={`relative group flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {imageUrl ? (
                    <>
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-contain rounded-lg p-2" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                            <span className="text-white font-bold opacity-0 group-hover:opacity-100">Pilih gambar lain</span>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        <UploadIcon className="w-12 h-12 mb-2"/>
                        <p className="font-semibold">Klik untuk mengunggah atau seret dan lepas</p>
                        <p className="text-sm">PNG, JPG, WEBP (maks. 4MB)</p>
                    </div>
                )}
            </label>
        </div>
    );
};
