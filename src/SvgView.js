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
        <div className="border border-gray-300 rounded-lg max-w-full mx-auto">
          <div
            dangerouslySetInnerHTML={{ __html: updatedSvgContent }}
          />
        
        </div>
      )}
    </div>
  );
}

export default SvgView;
