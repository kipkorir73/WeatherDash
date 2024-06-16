import React from 'react';

const LocationSearch = ({ location, setLocation, handleSearch, getGeolocationWeather }) => {
  return (
    <div className="location-search">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location..."
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={getGeolocationWeather}>Use My Location</button>
    </div>
  );
};

export default LocationSearch;
