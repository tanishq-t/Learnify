import React, { useState, useEffect } from "react";

function LocationDropdown({selectedCountry,setSelectedCountry}) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
      <select
        value={selectedCountry}
        onChange={handleChange}
        className='bg-transparent p-[1rem] border-[#ad2323] rounded-[0.4rem] border-[0.1rem] text-[1rem] focus:border-[#d94c4c] focus:outline-none'
      >
        <option value="" disabled className="">
          Location
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
  );
}

export default LocationDropdown;
