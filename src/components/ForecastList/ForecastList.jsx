import React from "react";
import { formatDate } from "../../utils/formatDate";

export default function ForecastList({ forecast }) {
  return (
    <div className="forecast-list">
      {forecast.list.slice(0, 5).map((item, index) => (
        <div key={index} className="forecast-item">
          <p>{formatDate(item.dt_txt)}</p>
          <p>{Math.round(item.main.temp)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt="icon"
          />
        </div>
      ))}
    </div>
  );
}
