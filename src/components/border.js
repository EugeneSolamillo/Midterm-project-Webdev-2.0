import React from 'react';

function Borders({ borderCodes, allCountries }) {
  const borderNames = borderCodes?.map(code => {
    const match = allCountries.find(country => country.cca3 === code);
    return match?.name.common || code;
  });

  return (
    <div>
      <h4>Borders:</h4>
      <ul>
        {borderNames?.length > 0 ? (
          borderNames.map((name, idx) => <li key={idx}>{name}</li>)
        ) : (
          <li>No bordering countries</li>
        )}
      </ul>
    </div>
  );
}

export default Borders;
