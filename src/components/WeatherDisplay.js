import React from 'react';

const WeatherDisplay = ({ weather, unit }) => {
  const unitLabel = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="current-weather">
      <h2>Current Weather</h2>
      {weather && (
        <div className="weather-info">
          <div className="card">
            <h3>{weather.location}</h3>
            <p>Temperature: {weather.temperature}{unitLabel}</p>
            <p>Condition: {weather.condition}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind Speed: {weather.windSpeed} km/h</p>
            <p>Sunrise: {weather.sunrise}</p>
            <p>Sunset: {weather.sunset}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
