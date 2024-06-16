const apiKey = 'JTZUAXLMSP9DPRB2E4QKQVNG5';
const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function fetchCurrentWeather(location, unit) {
  const url = `${baseUrl}/${encodeURIComponent(location)}?unitGroup=${unit}&key=${apiKey}&include=current`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    const data = await response.json();
    const currentWeather = parseCurrentWeather(data);
    return currentWeather;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Could not fetch current weather data. Please try again later.');
  }
}

export async function fetchWeatherForecast(location, unit) {
  const url = `${baseUrl}/${encodeURIComponent(location)}?unitGroup=${unit}&key=${apiKey}&include=daily&elements=datetime,tempmax,tempmin,icon`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    const data = await response.json();
    const forecast = data.days.slice(0, 7).map(day => parseDailyForecast(day));
    return forecast;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw new Error('Could not fetch weather forecast data. Please try again later.');
  }
}

function parseCurrentWeather(data) {
  return {
    location: data.resolvedAddress,
    temperature: data.currentConditions.temp,
    condition: data.currentConditions.icon,
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.wspd,
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset
  };
}

function parseDailyForecast(day) {
  return {
    date: day.datetime,
    maxTemp: day.tempmax,
    minTemp: day.tempmin,
    condition: day.icon
  };
}
