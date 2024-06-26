import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { trace } from 'potrace';
import FileInput from './FileInput';
import ImageUpload from './ImageUpload';
import ImageView from './ImageView';
import SvgView from './SvgView';
import TraceSettings from './TraceSettings';

function ImageToSVGConverter() {
  const [originalImage, setOriginalImage] = useState(null);
  const [svgContent, setSvgContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState(128);
  const [turnPolicy, setTurnPolicy] = useState('minority');
  const [turdSize, setTurdSize] = useState(2);
  const [draggingOver, setDraggingOver] = useState(false);

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
    <div className="container mx-auto">
      <div
        className={`flex flex-col items-center ${draggingOver ? 'bg-gray-200' : ''}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <FileInput onUpload={handleImage} draggingOver={draggingOver} />

        <ImageUpload
          handleConvert={handleConvert}
          originalImage={originalImage}
          loading={loading}
        />

        <TraceSettings
          threshold={threshold}
          setThreshold={setThreshold}
          turnPolicy={turnPolicy}
          setTurnPolicy={setTurnPolicy}
          turdSize={turdSize}
          setTurdSize={setTurdSize}
        />

        {loading && <div className="text-lg font-bold text-gray-700 mt-4">Loading...</div>}

        <div className="flex justify-center w-full mt-4">
          <ImageView originalImage={originalImage} />

          <SvgView
            svgContent={svgContent}
            handleDownloadSVG={handleDownloadSVG}
          />
        </div>
      </div>
    </div>
  );
}

export default ImageToSVGConverter;
