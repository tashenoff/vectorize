import React from 'react';

function TraceSettings({
  threshold,
  setThreshold,
  turnPolicy,
  setTurnPolicy,
  turdSize,
  setTurdSize,
  onClose,
  onConfirm,
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose(); // Close the settings window
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Настройки трассировки</h2>
      <div className="mb-2 flex flex-col">
        <label className="mb-1">Порог:</label>
        <input
          type="range"
          min="0"
          max="255"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-sm text-gray-600">{threshold}</span> {/* Display threshold value */}
      </div>
      <div className="mb-2 flex flex-col">
        <label className="mb-1">Политика поворота:</label>
        <select
          value={turnPolicy}
          onChange={(e) => setTurnPolicy(e.target.value)}
          className="w-full"
        >
          <option value="black">Черный</option>
          <option value="white">Белый</option>
          <option value="left">Лево</option>
          <option value="right">Право</option>
          <option value="minority">Меньшинство</option>
          <option value="majority">Большинство</option>
        </select>
      </div>
      <div className="mb-2 flex flex-col">
        <label className="mb-1">Размер:</label>
        <input
          type="range"
          min="0"
          max="10"
          value={turdSize}
          onChange={(e) => setTurdSize(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2"
        >
          Отмена
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
}

export default TraceSettings;
