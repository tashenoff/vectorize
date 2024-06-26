import React, { useState } from 'react';
import { trace } from 'potrace';
import { saveAs } from 'file-saver';

function ImageToSVGConverter() {
  const [originalImage, setOriginalImage] = useState(null);
  const [svgContent, setSvgContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState(128);
  const [turnPolicy, setTurnPolicy] = useState('minority');
  const [turdSize, setTurdSize] = useState(2);
  const [draggingOver, setDraggingOver] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    handleImage(file);
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file);
    setDraggingOver(false);
  };

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
      setSvgContent(null); // Сброс SVG, если загружается новое изображение
    };
    reader.readAsDataURL(file);
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

  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    saveAs(blob, 'image.svg');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDraggingOver(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDraggingOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDraggingOver(false);
  };

  return (
    <div 
      className={`flex flex-col items-center ${draggingOver ? 'bg-gray-200' : ''}`}
      onDrop={handleImageDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        className={`mb-4 p-4 border-2 border-dashed rounded ${draggingOver ? 'border-blue-500' : 'border-gray-300'}`} 
      />
      <div className="flex flex-col items-center mb-4">
        <label className="mb-2 flex flex-col items-center">
          Threshold: {threshold}
          <input
            type="range"
            min="0"
            max="255"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-64"
          />
        </label>
        <label className="mb-2 flex flex-col items-center">
          Turn Policy:
          <select
            value={turnPolicy}
            onChange={(e) => setTurnPolicy(e.target.value)}
            className="mt-1"
          >
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="minority">Minority</option>
            <option value="majority">Majority</option>
          </select>
        </label>
        <label className="mb-2 flex flex-col items-center">
          Turd Size: {turdSize}
          <input
            type="range"
            min="0"
            max="10"
            value={turdSize}
            onChange={(e) => setTurdSize(Number(e.target.value))}
            className="w-64"
          />
        </label>
      </div>
      <button 
        onClick={handleConvert} 
        className={`mb-4 px-6 py-2 bg-blue-500 text-white rounded ${originalImage ? '' : 'bg-gray-400 cursor-not-allowed'}`} 
        disabled={!originalImage}
      >
        Convert to SVG
      </button>
      {loading && <div className="text-lg font-bold text-gray-700 mb-4">Loading...</div>}
      <div className="flex justify-center w-full">
        {originalImage && (
          <div className="text-center mx-4 flex-1">
            <h3 className="mb-2 text-lg font-semibold">Original Image</h3>
            <img src={originalImage} alt="Original" className="max-w-full max-h-80 mb-4" />
          </div>
        )}
        {svgContent && (
          <div className="text-center mx-4 flex-1">
            <h3 className="mb-2 text-lg font-semibold">Converted SVG</h3>
            <div dangerouslySetInnerHTML={{ __html: svgContent }} className="max-w-full max-h-80 mb-4" />
            <button onClick={handleDownload} className="px-6 py-2 bg-green-500 text-white rounded">Download SVG</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageToSVGConverter;
