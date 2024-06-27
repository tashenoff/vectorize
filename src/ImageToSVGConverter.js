import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { trace } from 'potrace';
import FileInput from './FileInput';
import TraceSettings from './TraceSettings';
import ImageView from './ImageView';
import SvgView from './SvgView';

function ImageToSVGConverter() {
  const [originalImage, setOriginalImage] = useState(null);
  const [svgContent, setSvgContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState(128);
  const [turnPolicy, setTurnPolicy] = useState('minority');
  const [turdSize, setTurdSize] = useState(2);
  const [showSettings, setShowSettings] = useState(false);

  const handleImage = (imageData) => {
    setOriginalImage(imageData);
    setSvgContent(null); // Clear SVG content when a new image is loaded
  };

  const handleConvert = () => {
    if (!originalImage) return;

    setLoading(true);
    const img = new Image();
    img.src = originalImage;
    img.onload = () => {
      trace(img.src, {
        threshold,
        turnPolicy,
        turdSize,
      }, (err, svg) => {
        setLoading(false);
        if (err) {
          console.error(err);
          return;
        }
        setSvgContent(svg);
      });
    };
  };

  const handleDownloadSVG = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    saveAs(blob, 'image.svg');
  };

  const handleReset = () => {
    setOriginalImage(null);
    setSvgContent(null);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-cover bg-center bg-[url('5130890.jpg')]">
      <header className="w-full bg-blue-600 py-4">
        <div className="container mx-auto text-white text-center">
          <h1 className="text-4xl font-bold">Картинка в вектор</h1>
        </div>
      </header>

      <main className="container mx-auto flex-1 flex flex-col justify-center items-center">
        {!originalImage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <FileInput onUpload={handleImage} draggingOver={false} />
          </div>
        )}

        {originalImage && showSettings && (
          <div className="fixed top-0 right-0 mt-4 mr-4">
            <TraceSettings
              threshold={threshold}
              setThreshold={setThreshold}
              turnPolicy={turnPolicy}
              setTurnPolicy={setTurnPolicy}
              turdSize={turdSize}
              setTurdSize={setTurdSize}
              onClose={() => setShowSettings(false)}
              onConfirm={handleConvert}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center mb-8">
          <div className="flex justify-center items-center">
            <ImageView originalImage={originalImage} width="400px" height="auto" />
          </div>
          <div className="flex justify-center items-center">
            <SvgView svgContent={svgContent} width="400px" />
          </div>
        </div>

        <div className="flex justify-center items-center mb-4">
          {originalImage && !svgContent && (
            <button
              onClick={handleConvert}
              className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Конвертация...' : 'Конвертировать'}
            </button>
          )}

          {originalImage && !showSettings && (
            <button
              onClick={() => setShowSettings(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-4"
            >
              Показать настройки
            </button>
          )}

          {originalImage && svgContent && (
            <>
              <button
                onClick={handleDownloadSVG}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-4"
              >
                Скачать векторное изображение
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-4"
              >
                Начать заново
              </button>
            </>
          )}
        </div>

        {loading && <div className="text-lg font-bold text-gray-700 mt-4">Загрузка...</div>}
      </main>

      <footer className="w-full bg-blue-600 py-4">
        <div className="container mx-auto text-white text-center">
          <p>&copy; 2024 Конвертер изображения в SVG. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

export default ImageToSVGConverter;
