import React from 'react';

function Flag({ flagUrl, countryName }) {
  return (
    <div>
      <img src={flagUrl} alt={`${countryName} flag`} width="200" />
    </div>
  );
}

export default Flag;
