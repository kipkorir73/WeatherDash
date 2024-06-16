import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import LocationSearch from './components/LocationSearch';
import UnitConversion from './components/UnitConversion';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorDisplay from './components/ErrorDisplay';
import { fetchCurrentWeather, fetchWeatherForecast } from './weatherService';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);
  const isInitialMount = useRef(true);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const getLocationName = async (latitude, longitude) => {
    const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`);
    const data = await response.json();
    return `${data.city}, ${data.country}`;
  };

  const getWeatherData = useCallback(async (location) => {
    setLoading(true);
    setError(null);
    try {
      const [currentWeather, forecastData] = await Promise.all([
        fetchCurrentWeather(location, unit),
        fetchWeatherForecast(location, unit),
      ]);
      setWeather(currentWeather);
      setForecast(forecastData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Could not fetch weather data. Please try again later.');
      console.error('Error fetching weather data:', error);
    }
  }, [unit]);

  const getGeolocationWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      const locationName = await getLocationName(latitude, longitude);
      setLocation(locationName);
      await getWeatherData(`${latitude},${longitude}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Could not fetch weather for your location. Please enter manually.');
      console.error('Error getting geolocation weather:', error);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const fetchData = async () => {
      try {
        await getWeatherData(location);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [location, getWeatherData]);

  const handleSearch = () => {
    if (location.trim()) {
      getWeatherData(location.trim());
    } else {
      setError('Please enter a location.');
    }
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="App">
      <div className="weather-container">
        <LocationSearch
          location={location}
          setLocation={setLocation}
          handleSearch={handleSearch}
          getGeolocationWeather={getGeolocationWeather}
        />
        <UnitConversion unit={unit} handleUnitChange={handleUnitChange} />
        {loading && <LoadingIndicator />}
        {error && <ErrorDisplay error={error} />}
        {weather && <WeatherDisplay weather={weather} unit={unit} />}
        {forecast.length > 0 && <ForecastDisplay forecast={forecast} unit={unit} />}
      </div>
    </div>
  );
}

export default App;
