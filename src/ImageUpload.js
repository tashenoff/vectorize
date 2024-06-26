import React from 'react';

const ImageUpload = ({ handleConvert, originalImage, loading }) => (
  <div className="mt-8">
    <button
      onClick={handleConvert}
      className={`px-6 py-2 bg-blue-500 text-white rounded ${originalImage ? '' : 'bg-gray-400 cursor-not-allowed'}`}
      disabled={!originalImage || loading}
    >
      {loading ? 'Converting...' : 'Convert to SVG'}
    </button>
  </div>
);

export default ImageUpload;
