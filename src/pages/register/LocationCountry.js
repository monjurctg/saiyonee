import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {COUNTRIES} from "../../constants/register_constants";
import {setCountry} from "../../redux/slices/authSlices";
import { stoteRegisterValues } from "../../utils/functions";

function LocationCountry() {
  const navigator = useNavigate();

  const [searchedCountry, setSearchedCountry] = useState("");
  const onSearchChange = (e) => setSearchedCountry(e.target.value);
  const dispatch = useDispatch();
  // const [current_country, setCurrentCountry] = useState("");
  // const [current_city, setCurrentCity] = useState("");
  const {current_country} = useSelector((state) => state.auth);
  const onCountryChange = (e) => {
    dispatch(setCountry(e.target.value));
    stoteRegisterValues({current_country: e.target.value})

    // setCurrentCity(undefined);
    navigator(-1);
  };

  return (
    <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
      <div className="container pt-4 px-4">
        <div
          onClick={() => navigator(-1)}
          className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
          style={{height: "58px", width: "58px"}}>
          <img src="/img/back-icon.svg" alt="back" />
        </div>
      </div>
      <div className="container px-4 pb-2 overflow-auto">
        <h1>Select candidate's current country</h1>
        <div className="form-floating my-4 text-muted shadow-2">
          <input
            type="text"
            id="inputSearchCountry"
            value={searchedCountry}
            onChange={onSearchChange}
            className="form-control border-0 rounded-1"
            placeholder="searchCountry"
            aria-describedby="searchCountry"
          />
          <label htmlFor="inputSearchCountry">Search for country</label>
        </div>
        <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
          <div className="col-10">
            <label htmlFor="None" className="form-check-label bg-white w-100">
              <strong>Select candidate's current country</strong>
            </label>
          </div>
          <div className="col-2">
            <input
              className="form-check-input"
              type="radio"
              name="current_country"
              checked={!current_country}
              onChange={onCountryChange}
              value={undefined}
              id="None"
            />
          </div>
        </div>
        {COUNTRIES.map(
          (country, i) =>
            country.toLowerCase().includes(searchedCountry.toLowerCase()) && (
              <div
                key={i}
                className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
                <div className="col-10">
                  <label
                    htmlFor={country}
                    className="form-check-label bg-white w-100">
                    <strong>{country}</strong>
                  </label>
                </div>
                <div className="col-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="current_country"
                    checked={current_country === country}
                    onChange={onCountryChange}
                    value={country}
                    id={country}
                  />
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
export default LocationCountry;
