import { useRef, useState } from "react";
import React from "react";
import "../assets/styles/navbarStyles.css";
import "../assets/styles/inputSearch.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../Api";

const Navbar = ({
  isDarkMode,
  setDarkMode,
  onSearchChange,
  setIsCursorHover,
}) => {
  const refContainer = useRef(true);
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <header>
      <nav className={`${isDarkMode ? "dark" : ""}`}>
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          className="input-search"
        />
        <label
          className="switch"
          onMouseEnter={() => setIsCursorHover(true)}
          onMouseLeave={() => setIsCursorHover(false)}
        >
          <input
            ref={refContainer}
            type="checkbox"
            onChange={() => setDarkMode(!isDarkMode)}
          />
          <span className="slider"></span>
        </label>
      </nav>
    </header>
  );
};

export default Navbar;
