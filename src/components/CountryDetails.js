import React from 'react';

const CountryDetails = ({ country, allCountries, onBorderClick }) => {
  const {
    name,
    capital,
    region,
    subregion,
    population,
    area,
    latlng,
    borders,
    timezones,
    currencies,
    languages,
    flags,
  } = country;

  // Default flag URL handling
  const flagUrl = flags?.png 
    ? `https:${flags.png}` 
    : flags?.svg 
    ? `https:${flags.svg}` 
    : flags[0] || 'https://via.placeholder.com/200x130.png?text=No+Flag';

  const borderCountries = borders
    ? borders.map((borderCode) => allCountries.find((c) => c.cca3 === borderCode))
    : [];

  const handleBorderClick = (borderCountry) => {
    onBorderClick(borderCountry);
  };

  return (
    <div className="country-details">
      <h2>{name.common}</h2>
      <img src={flags.png} alt={`${name.common} flag`} style={{ width: '200px' }} />
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Subregion:</strong> {subregion}</p>
      <p><strong>Population:</strong> {population}</p>
      <p><strong>Area:</strong> {area} km²</p>
      <p><strong>Coordinates:</strong> {latlng ? latlng.join(', ') : 'N/A'}</p>
      <p><strong>Timezones:</strong> {timezones.join(', ')}</p>
      <p><strong>Currencies:</strong> {Object.keys(currencies).join(', ')}</p>
      <p><strong>Languages:</strong> {Object.values(languages).join(', ')}</p>

      {borders && borders.length > 0 && (
        <div>
          <h3>Border Countries:</h3>
          <ul>
            {borderCountries.map((borderCountry) => (
              <li key={borderCountry.cca3}>
                <button
                  onClick={() => handleBorderClick(borderCountry)}
                  className="border-country-btn"
                >
                  {borderCountry.name.common}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
