import React from 'react';

const UnitConversion = ({ unit, handleUnitChange }) => {
  return (
    <div className="unit-conversion">
      <label>
        <input
          type="radio"
          value="metric"
          checked={unit === 'metric'}
          onChange={handleUnitChange}
        />
        °C
      </label>
      <label>
        <input
          type="radio"
          value="imperial"
          checked={unit === 'imperial'}
          onChange={handleUnitChange}
        />
        °F
      </label>
    </div>
  );
};

export default UnitConversion;
