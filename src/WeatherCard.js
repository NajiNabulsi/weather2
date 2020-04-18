import React, { useState, useEffect } from "react";

// use states
const WeatherCard = () => {
  const [
    val = {
      city: undefined,
      country: undefined,
      main: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: undefined,
    },
    setVal,
  ] = useState();

  const [qurey, setQurey] = useState("Amsterdam");
  const [search, setSearch] = useState();

  // fetch weather function
  const getWeather = async () => {
    try {
      const apiCall = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${qurey}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      const response = await apiCall.json();

      setVal({
        city: `${response.name}, ${response.sys.country}`,
        main: response.weather[0].main,
        temp_max: response.main.temp_max,
        temp_min: response.main.temp_min,
        description: response.weather[0].description,
        error: false,
      });
    } catch {
      setVal({ error: true });
    }
  };

  useEffect(() => {
    getWeather();
  }, [qurey]);

  // handles
  const getSearch = (e) => {
    e.preventDefault();
    setQurey(search);
    setSearch("");
  };

  const getCityName = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div onLoad={getWeather}>
      <div className="form">
        <form onSubmit={getSearch}>
          <div className="search">
            <input
              type="text"
              className="input"
              placeholder="please enter a city name"
              name="city"
              autoComplete="off"
              onChange={getCityName}
            />
            <button className="btn">Get Weather</button>
          </div>
        </form>
      </div>

      {val.city && (
        <div className="weCard">
          <h1>{val.city}</h1>
          <h2>{val.main}</h2>
          <h3>{val.description}</h3>
          <h3>{val.temp_min}</h3>
          <h3>{val.temp_max}</h3>
        </div>
      )}

      {val.error && (
        <div className="err" role="alert">
          Please Enter City ...!
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
