import React from 'react';

const ForecastDisplay = ({ forecast, unit }) => {
  const unitLabel = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="forecast">
      <h2>7-Day Forecast</h2>
      <div className="forecast-info">
        {forecast.map(day => (
          <div key={day.date} className="card">
            <h3>{new Date(day.date).toLocaleDateString()}</h3>
            <img src={`https://weather.visualcrossing.com/static/img/icons/${day.condition}.png`} alt={day.condition} />
            <p>Max: {day.maxTemp}{unitLabel}</p>
            <p>Min: {day.minTemp}{unitLabel}</p>
            <p>Condition: {day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
