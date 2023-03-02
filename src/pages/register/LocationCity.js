import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Countries from "../../libs/cities_countries";
import {setCity} from "../../redux/slices/authSlices";
import {setEditProfileCity} from "../../redux/slices/editProfileslice";
import {stoteRegisterValues} from "../../utils/functions";

function LocationCity({module}) {
  const navigate = useNavigate();
  const [searchedCity, setSearchedCity] = useState("");
  const onSearchChange = (e) => setSearchedCity(e.target.value);

  const {current_city, current_country} = useSelector((state) => state.auth);
  console.log("current_city", current_city);

  const {country, city: editProfileCity} = useSelector(
    (state) => state.editProfile
  );
  // console.log("country", editProfileCity);

  const dispatch = useDispatch();
  const onCityChange = (e) => {
    console.log("e", e);
    if (module == "eidt_profile_city") {
      console.log(module);
      dispatch(setEditProfileCity(e.target.value));
      navigate(-1);
      return;
    } else {
      dispatch(setCity(e.target.value));
      stoteRegisterValues({current_city: e.target.value});

      navigate(-1);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
      <div className="container pt-4 px-4">
        <div
          onClick={() => navigate(-1)}
          className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
          style={{
            height: "40px",
            width: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <img src="/img/back-icon.svg" alt="back" />
        </div>
      </div>
      <div className="container px-4 pb-2 overflow-auto">
        <h1 className="card-title">Select candidate's current city</h1>
        <div className="form-floating my-4 text-muted shadow-2">
          <input
            type="text"
            id="inputSearchCity"
            value={searchedCity}
            onChange={onSearchChange}
            className="form-control border-0 rounded-1"
            placeholder="searchCity"
            aria-describedby="searchCity"
          />
          <label htmlFor="inputSearchCity">Search for city</label>
        </div>
        {/* <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
          <div className="col-10">
            <label htmlFor="None" className="form-check-label bg-white w-100">
              <strong>Select candidate's current city</strong>
            </label>
          </div>
          <div className="col-2">
            <input
              className="form-check-input"
              type="radio"
              name="current_city"
              checked={!current_city}
              onChange={onCityChange}
              value={undefined}
              id="None"
            />
          </div>
        </div> */}
        {(
          Countries[
            module == "eidt_profile_city" ? country : current_country
          ] || []
        ).map(
          (city, i) =>
            city.toLowerCase().includes(searchedCity.toLowerCase()) && (
              <div
                key={i}
                className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
                <div className="col-10">
                  <label
                    htmlFor={city}
                    className="form-check-label bg-white w-100">
                    <strong>{city}</strong>
                  </label>
                </div>
                <div className="col-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="current_city"
                    checked={current_city == city}
                    onChange={onCityChange}
                    value={city}
                    id={city}
                  />
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default LocationCity;
