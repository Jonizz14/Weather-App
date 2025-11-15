import React from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import "./DailyForecast.css";

export default function DailyForecast({ forecast }) {
  const getWeatherIcon = (icon) => {
    if (icon.includes("01")) return <WiDaySunny size={30} animate={true} />;
    if (icon.includes("02") || icon.includes("03") || icon.includes("04")) return <WiCloudy size={30} animate={true} />;
    if (icon.includes("09") || icon.includes("10")) return <WiRain size={30} animate={true} />;
    if (icon.includes("11")) return <WiThunderstorm size={30} animate={true} />;
    if (icon.includes("13")) return <WiSnow size={30} animate={true} />;
    return <WiDaySunny size={30} animate={true} />;
  };

  const groupByDay = (list) => {
    const days = {};
    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(item);
    });
    return Object.values(days).slice(0, 10); // First 10 days
  };

  const dailyData = groupByDay(forecast.list);

  // Calculate overall min and max for scaling bars
  const allTemps = forecast.list.map(item => item.main.temp);
  const overallMin = Math.min(...allTemps);
  const overallMax = Math.max(...allTemps);

  return (
    <div className="daily-forecast">
      <div className="daily-list">
        {dailyData.map((dayItems, index) => {
          const temps = dayItems.map(item => item.main.temp);
          const minTemp = Math.min(...temps);
          const maxTemp = Math.max(...temps);
          const middayItem = dayItems.find(item => new Date(item.dt * 1000).getHours() === 12) || dayItems[0];
          const date = new Date(dayItems[0].dt * 1000);
          const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'long' });

          const minPercent = ((minTemp - overallMin) / (overallMax - overallMin)) * 100;
          const maxPercent = ((maxTemp - overallMin) / (overallMax - overallMin)) * 100;

          return (
            <div key={index} className="daily-item">
              <span className="day">{dayName}</span>
              {getWeatherIcon(middayItem.weather[0].icon)}
              <div className="temp-bars">
                <div className="temp-bar">
                  <div className="bar-fill" style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}></div>
                </div>
                <div className="temp-labels">
                  <span className="high">{Math.round(maxTemp)}°</span>
                  <span className="low">{Math.round(minTemp)}°</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}