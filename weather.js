import React, { useState } from "react";
import axios from "axios";
import Weather from "./weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "./server";

const App = () => {
  const [city, setCity] = useState("");
  const [forecasts, setForecasts] = useState([]);

  const handleCitySearch = async () => {
    try {
      const response = await axios.get("/weather", {
        params: {
          searchQuery: city,
        },
      });

      setForecasts(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleCitySearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {forecasts.length > 0 && <Weather forecasts={forecasts} />}
    </div>
  );
};

export default Weather;
