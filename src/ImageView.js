import React from 'react';

const ImageView = ({ originalImage }) => (
  originalImage && (
    <div className="text-center mx-4 flex-1">
      <h3 className="mb-2 text-lg font-semibold">Original Image</h3>
      <img
        src={originalImage}
        alt="Original"
        className="max-w-full h-auto mx-auto rounded-lg border border-gray-300"
      />
    </div>
  )
);

export default ImageView;
