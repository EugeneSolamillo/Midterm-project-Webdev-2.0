import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [populationFilter, setPopulationFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data);  // Log the full response
        setCountries(response.data);
        const targetCountry = response.data.find(
          (country) => country.name.common.toLowerCase() === 'japan'
        );
        setSelectedCountry(targetCountry);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (regionFilter ? country.region.toLowerCase().includes(regionFilter.toLowerCase()) : true) &&
    (populationFilter ? country.population >= populationFilter : true)
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSearchQuery(country.name.common); // Set search query to the selected country name
  };

  const handleBorderClick = (borderCountry) => {
    setSelectedCountry(borderCountry);
    setSearchQuery(borderCountry.name.common); // Set the search query to the border country name
  };

  return (
    <div className="App">
      <Header />

      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Region Filter Dropdown */}
      <select onChange={(e) => setRegionFilter(e.target.value)} value={regionFilter}>
        <option value="">Select Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      {/* Population Filter Dropdown */}
      <select onChange={(e) => setPopulationFilter(e.target.value)} value={populationFilter}>
        <option value="">Select Population Size</option>
        <option value="10000000">More than 10 million</option>
        <option value="50000000">More than 50 million</option>
        <option value="100000000">More than 100 million</option>
      </select>

      {/* Display search results */}
      <div>
        {filteredCountries.length > 0 && (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.cca3} onClick={() => handleCountrySelect(country)}>
                {country.name.common}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display selected country details */}
      {selectedCountry ? (
        <CountryDetails
          country={selectedCountry}
          allCountries={countries}
          onBorderClick={handleBorderClick} // Pass the onBorderClick handler
        />
      ) : (
        <p>Loading country data...</p>
      )}

      <Footer />
    </div>
  );
}

export default App;
