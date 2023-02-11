import React from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const Input = (props) => {

  return (
    <div className="input-container">
      <form>
        <input
          type="text"
          placeholder="Enter a town or city"
          onChange={(e) => props.setName(e.target.value)}
          name="name"
          className="city-input"
        />
        <CountryDropdown
          value={props.country}
          onChange={(val) => props.setCountry(val)}
          name="country"
          classes="crs-country"
          valueType="short"
        />
        <RegionDropdown
          country={props.country}
          value={props.region}
          onChange={(val) => props.setRegion(val)}
          name="region"
          classes="crs-state"
          countryValueType="short"
          defaultOptionLabel="Select state (optional)"
        />
        <div className="state-spacer hidden"/>
        <button onClick={props.submitLocation} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
