import React from 'react';

const FileInput = ({ onUpload, draggingOver }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        onUpload(imageData);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload PNG or JPEG images only.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={`p-8 border border-dashed border-gray-400 rounded-lg text-center ${draggingOver ? 'bg-gray-200' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <p className="text-lg font-medium">Drag & Drop Image File Here</p>
      <p className="text-sm text-gray-500 mt-2">or click to select</p>
      <input
        type="file"
        className="hidden"
        accept="image/png, image/jpeg" // Разрешаем только PNG и JPEG файлы
        onChange={handleFileChange}
      />
      <button
        onClick={() => document.querySelector('input[type="file"]').click()}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Select File
      </button>
    </div>
  );
};

export default FileInput;
