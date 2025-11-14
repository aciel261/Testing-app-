
import React, { useState, useCallback, useMemo } from 'react';
import { generateProductPhoto } from './services/geminiService';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { ImageFile } from './types';

type AspectRatio = '1:1' | '4:3' | '3:4' | '16:9' | '9:16';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError("File is too large. Please upload an image under 4MB.");
        setImageFile(null);
        setGeneratedImage(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageFile({
          file: file,
          previewUrl: result,
          base64: result.split(',')[1],
          mimeType: file.type,
        });
        setGeneratedImage(null);
        setError(null);
      };
      reader.onerror = () => {
          setError("Failed to read the image file.");
          setImageFile(null);
          setGeneratedImage(null);
      }
      reader.readAsDataURL(file);
    } else {
        setImageFile(null);
        setGeneratedImage(null);
    }
  }, []);

  const handleGenerateClick = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const newImage = await generateProductPhoto(imageFile.base64, imageFile.mimeType, aspectRatio);
      setGeneratedImage(newImage);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the image.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, aspectRatio]);
  
  const originalImageUrl = useMemo(() => imageFile?.previewUrl || null, [imageFile]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Control Panel */}
        <div className="lg:w-1/3 w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Unggah Foto Produk</h2>
            <p className="text-gray-500 mb-6">Ubah foto biasa Anda menjadi gambar profesional berkualitas studio.</p>
            
            <ImageUploader onFileChange={handleFileChange} imageUrl={originalImageUrl} />

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Pilih Aspek Rasio</h3>
                <div className="grid grid-cols-5 gap-2">
                    {(['1:1', '4:3', '3:4', '16:9', '9:16'] as const).map((ratio) => (
                        <button
                            key={ratio}
                            onClick={() => setAspectRatio(ratio)}
                            className={`px-2 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                aspectRatio === ratio
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            aria-pressed={aspectRatio === ratio}
                        >
                            {ratio}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleGenerateClick}
                disabled={!imageFile || isLoading}
                className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md"
            >
                {isLoading ? 'Generating...' : 'Buat Foto Profesional'}
            </button>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>

        {/* Display Area */}
        <div className="lg:w-2/3 w-full">
          {isLoading && <Loader />}
          {!isLoading && generatedImage && originalImageUrl && (
            <ResultDisplay originalSrc={originalImageUrl} generatedSrc={generatedImage} />
          )}
          {!isLoading && !generatedImage && (
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-8 h-[calc(100vh-10rem)] min-h-[500px]">
                <img src="https://storage.googleapis.com/aistudio-samples/public/product.png" alt="placeholder" className="w-48 h-48 mb-6 opacity-50"/>
                <h3 className="text-2xl font-bold text-gray-600">Hasil Anda Akan Muncul di Sini</h3>
                <p className="text-gray-400 mt-2 max-w-sm text-center">Unggah foto produk Anda, dan biarkan AI kami melakukan keajaibannya untuk menciptakan gambar yang sempurna.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
