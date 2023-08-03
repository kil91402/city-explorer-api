// Weather.js
import React from "react";

const Weather = ({ forecasts }) => {
  return (
    <div>
      <h3>Weather Forecast</h3>
      <ul className="list-group">
        {forecasts.map((forecast, index) => (
          <li key={index} className="list-group-item">
            <strong>Date:</strong> {forecast.date},{" "}
            <strong>Description:</strong> {forecast.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weather;
