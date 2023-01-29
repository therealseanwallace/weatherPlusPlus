import React from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const Input = (props) => {

  return (
    <div className="input-container">
      <form>
        <input
          type="text"
          placeholder="Enter a town or city"
          onChange={props.setName}
          name="name"
        />
        <CountryDropdown
          value={props.country}
          onChange={(val) => props.setCountry(val)}
          name="country"
        />
        <RegionDropdown
          country={props.country}
          value={props.region}
          onChange={(val) => props.setRegion(val)}
          name="region"
        />
        <button onClick={props.submitLocation} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
