import React from 'react';

const HourlyForecastDisplay = ({ hourly, unit }) => {
  const unitLabel = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="hourly-forecast">
      <h2>Hourly Forecast</h2>
      <div className="hourly-info">
        {hourly.map(hour => (
          <div key={hour.time} className="card">
            <h3>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
            <img src={`https://weather.visualcrossing.com/static/img/icons/${hour.condition}.png`} alt={hour.condition} />
            <p>Temperature: {hour.temp}{unitLabel}</p>
            <p>Condition: {hour.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecastDisplay;
