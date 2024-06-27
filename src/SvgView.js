import React from 'react';

function SvgView({ svgContent, handleDownloadSVG, width = '100%', height = 'auto' }) {
  const updatedSvgContent = svgContent
    ? svgContent
        .replace(/<svg[^>]*>/, (match) => {
          // Add or replace width and height attributes
          if (match.includes('width')) {
            match = match.replace(/width="[^"]*"/, `width="${width}"`);
          } else {
            match = match.replace(/<svg/, `<svg width="${width}"`);
          }

          if (match.includes('height')) {
            match = match.replace(/height="[^"]*"/, `height="${height}"`);
          } else {
            match = match.replace(/<svg/, `<svg height="${height}"`);
          }

          return match;
        })
    : '';

  return (
    <div className="flex justify-center items-center">
      {updatedSvgContent && (
        <div className="border border-gray-300 rounded-lg p-4 max-w-full mx-auto">
          <div
            dangerouslySetInnerHTML={{ __html: updatedSvgContent }}
          />
          <button
            onClick={handleDownloadSVG}
            className="block mx-auto mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download SVG
          </button>
        </div>
      )}
    </div>
  );
}

export default SvgView;
