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
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Trace Settings</h2>
      <div className="mb-2 flex flex-col">
        <label className="mb-1">Threshold:</label>
        <input
          type="range"
          min="0"
          max="255"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label className="mb-1">Turn Policy:</label>
        <select
          value={turnPolicy}
          onChange={(e) => setTurnPolicy(e.target.value)}
          className="w-full"
        >
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="minority">Minority</option>
          <option value="majority">Majority</option>
        </select>
      </div>
      <div className="mb-2 flex flex-col">
        <label className="mb-1">Turd Size:</label>
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
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default TraceSettings;
