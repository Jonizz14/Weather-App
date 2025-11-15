import React, { useState, useEffect } from "react";
import './SearchBar.css'

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(false);
  };


  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });

          try {
            // Reverse geocode to get city name
            const geoResponse = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
            );
            const geoData = await geoResponse.json();

            if (geoData.length > 0) {
              const cityName = geoData[0].name;
              onSearch(cityName);
            } else {
              alert("Could not find city name for your location");
            }
          } catch (error) {
            console.error("Error reverse geocoding:", error);
            alert("Error getting city name from location");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          let message = "Error getting location";
          if (error.code === 1) {
            message = "Location permission denied. Please allow location access and try again.";
          } else if (error.code === 2) {
            message = "Location unavailable. Please check your GPS settings.";
          } else if (error.code === 3) {
            message = "Location request timed out. Please try again.";
          }
          alert(message);
        },
        {
          timeout: 15000,
          enableHighAccuracy: true
        }
      );
    } else {
      alert("Your browser does not support geolocation");
    }
  };

  return (
    <div className="search-container" onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit} className="search-bar">
        <div className="group">
          <svg
            className="icon"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </svg>

          <input
            type="text"
            className="input"
            placeholder="Search City"
            value={city}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          />
        </div>

      </form>
    </div>
  );
}

