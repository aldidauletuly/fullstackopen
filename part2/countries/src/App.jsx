import axios from 'axios';
import { useState, useEffect } from 'react';
import CountriesList from './components/CountriesList';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const hook = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setCountries(res.data);
      });
  };
  useEffect(hook, []);

  const handleInputChange = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Countries Data</h1>
      <div>
        Find countries:{' '}
        <input type='text' value={searchQuery} onChange={handleInputChange} />
      </div>
      <CountriesList
        countries={countries.filter(country =>
          country.name.common
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
        )}
      />
    </div>
  );
};

export default App;
