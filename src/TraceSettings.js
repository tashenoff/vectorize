import React from 'react';

const TraceSettings = ({
  threshold,
  setThreshold,
  turnPolicy,
  setTurnPolicy,
  turdSize,
  setTurdSize,
}) => (
  <div className="flex flex-col items-center mt-4">
    <div className="flex flex-col items-center">
      <label className="mb-2 flex flex-col items-center">
        Threshold: {threshold}
        <input
          type="range"
          min="0"
          max="255"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-64"
        />
      </label>
      <label className="mb-2 flex flex-col items-center">
        Turn Policy:
        <select
          value={turnPolicy}
          onChange={(e) => setTurnPolicy(e.target.value)}
          className="mt-1"
        >
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="minority">Minority</option>
          <option value="majority">Majority</option>
        </select>
      </label>
      <label className="mb-2 flex flex-col items-center">
        Turd Size: {turdSize}
        <input
          type="range"
          min="0"
          max="10"
          value={turdSize}
          onChange={(e) => setTurdSize(Number(e.target.value))}
          className="w-64"
        />
      </label>
    </div>
  </div>
);

export default TraceSettings;
