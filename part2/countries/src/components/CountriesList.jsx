import { useState } from 'react';
import Country from './Country';

const CountriesList = ({ countries }) => {
  const [expandedCountries, setExpandedCountries] = useState([]);

  const handleShow = e =>
    setExpandedCountries([...expandedCountries, e.target.id]);

  const handleHide = e =>
    setExpandedCountries(
      expandedCountries.filter(country => country !== e.target.id)
    );

  if (countries.length === 1)
    return (
      <div>
        <h2>{countries[0].name.common}</h2>
        <Country country={countries[0]} />
      </div>
    );

  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          <h2>
            {country.name.common}{' '}
            <button
              id={country.name.common}
              onClick={
                expandedCountries.includes(country.name.common)
                  ? handleHide
                  : handleShow
              }
            >
              {expandedCountries.includes(country.name.common)
                ? 'hide'
                : 'show'}
            </button>
          </h2>
          {expandedCountries.includes(country.name.common) ? (
            <Country country={country} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
