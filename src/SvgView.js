import React from 'react';

const SvgView = ({ svgContent, handleDownloadSVG }) => (
  svgContent && (
    <div className="text-center mx-4 flex-1">
      <h3 className="mb-2 text-lg font-semibold">Converted SVG</h3>
      <div
        className="border border-gray-300 rounded-lg p-4 max-w-full mx-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      <button
        onClick={handleDownloadSVG}
        className="block mx-auto mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Download SVG
      </button>
    </div>
  )
);

export default SvgView;
