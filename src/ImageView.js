import React from 'react';

function ImageView({ originalImage, width = '100%', height = 'auto' }) {
  return (
    <div className="flex justify-center items-center">
      {originalImage && (
        <img
          src={originalImage}
          alt="Original"
          className="max-w-full h-auto mx-auto rounded-lg border border-gray-300"
          style={{ width, height }}
        />
      )}
    </div>
  );
}

export default ImageView;
