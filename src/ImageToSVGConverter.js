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
        // setShowSettings(false); // Optional: Hide settings after image upload
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
                // Do not set setShowSettings(false); to prevent hiding settings after conversion
            });
        };
    };

    const handleDownloadSVG = () => {
        if (!svgContent) return;
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        saveAs(blob, 'image.svg');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            {!originalImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
                        onClose={() => setShowSettings(false)} // Optionally handle close here
                        onConfirm={handleConvert}
                    />
                </div>
            )}

            <div className="container mx-auto flex-1">
                <div className="flex justify-center items-center py-8">
                    <h1 className="text-4xl font-bold text-gray-800">Image to SVG Converter</h1>
                </div>

                <div className="flex flex-col justify-center items-center mb-8">
                    <div className="w-full md:w-[600px] md:mr-4">
                        <ImageView originalImage={originalImage}
                            width="500px" />
                    </div>
                    <div className="w-full md:w-[300px] md:ml-4 flex justify-center items-center">
                        <SvgView
                            svgContent={svgContent}
                            handleDownloadSVG={handleDownloadSVG}
                            width="500px"
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center mb-4">
                    {originalImage && !svgContent && (
                        <button
                            onClick={handleConvert}
                            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Converting...' : 'Convert'}
                        </button>
                    )}

                    {originalImage && !showSettings && (
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-4"
                        >
                            Show Settings
                        </button>
                    )}
                </div>

                {loading && <div className="text-lg font-bold text-gray-700 mt-4">Loading...</div>}
            </div>
        </div>
    );
}

export default ImageToSVGConverter;
