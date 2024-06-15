import axios from 'axios';
import { useState, useEffect } from 'react';

const api_key = import.meta.env.VITE_WEATHER_KEY;

const Country = ({ country }) => {
  const {
    name,
    cca2,
    cca3,
    flags,
    region,
    capital,
    population,
    area,
    languages,
    capitalInfo
  } = country;
  const [lat, lon] = capitalInfo.latlng;

  const [currentWeather, setCurrentWeather] = useState({});

  const hook = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${lat},${lon}`
      )
      .then(res => setCurrentWeather(res.data.current))
      .catch(err => console.log(err));
  };

  useEffect(hook, []);

  return (
    <div id='matchedCountry'>
      <h3>
        ({cca2}/{cca3})
      </h3>
      <img src={flags.png} style={{ border: '1px solid black' }} />
      <p>Official name: {name.official}</p>
      <p>Region: {region}</p>
      <p>Capital: {capital}</p>
      <p>Population: {new Intl.NumberFormat().format(population)}</p>
      <p>
        Area: {new Intl.NumberFormat().format(area)} km
        <sup>2</sup>
      </p>
      <h3>Languages</h3>
      <ul>
        {Object.values(languages).map(language => (
          <li key={name.common + '.' + language}>{language}</li>
        ))}
      </ul>
      <h3>Current weather in {capital}:</h3>
      <p>Temperature: {currentWeather.temp_c}°C</p>
      <p>Humidity: {currentWeather.humidity}%</p>
      <p>Wind: {((currentWeather.wind_kph * 1000) / 3600).toFixed(1)} m/s</p>
    </div>
  );
};

export default Country;
