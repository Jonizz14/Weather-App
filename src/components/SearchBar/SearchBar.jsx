import React, { useState, useEffect } from "react";
import './SearchBar.css'

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Popular cities in Uzbekistan and nearby countries
  const popularCities = [
    { name: "Toshkent", country: "O'zbekiston" },
    { name: "Samarqand", country: "O'zbekiston" },
    { name: "Buxoro", country: "O'zbekiston" },
    { name: "Andijon", country: "O'zbekiston" },
    { name: "Namangan", country: "O'zbekiston" },
    { name: "Farg'ona", country: "O'zbekiston" },
    { name: "Jizzax", country: "O'zbekiston" },
    { name: "Guliston", country: "O'zbekiston" },
    { name: "Navoiy", country: "O'zbekiston" },
    { name: "Qarshi", country: "O'zbekiston" },
    { name: "Nukus", country: "O'zbekiston" },
    { name: "Termiz", country: "O'zbekiston" },
    { name: "Urganch", country: "O'zbekiston" },
    { name: "Moscow", country: "Rossiya" },
    { name: "St. Petersburg", country: "Rossiya" },
    { name: "Almaty", country: "Qozog'iston" },
    { name: "Astana", country: "Qozog'iston" },
    { name: "Bishkek", country: "Qirg'iziston" },
    { name: "Dushanbe", country: "Tojikiston" },
    { name: "Ashgabat", country: "Turkmaniston" }
  ];

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

    if (value.length > 0) {
      const filtered = popularCities.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.country.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    onSearch(suggestion.name);
    setShowSuggestions(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          // You would typically reverse geocode here to get city name
          // For now, we'll just show coordinates
          console.log(`Location: ${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Joylashuvni aniqlashda xatolik yuz berdi");
        }
      );
    } else {
      alert("Brauzeringiz geolocation qo'llab-quvvatlamaydi");
    }
  };

  return (
    <div className="search-container">
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
            type="search"
            className="input"
            placeholder="Shahar nomini kiriting yoki joylashuvni aniqlang..."
            value={city}
            onChange={handleInputChange}
            onFocus={() => city && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          <button
            type="button"
            className="location-btn"
            onClick={getCurrentLocation}
            title="Joriy joylashuvni aniqlash"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="suggestion-name">{suggestion.name}</div>
                <div className="suggestion-country">{suggestion.country}</div>
              </div>
            ))}
          </div>
        )}
      </form>

      {currentLocation && (
        <div className="location-info glass-card" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          📍 Joriy joylashuv: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
        </div>
      )}
    </div>
  );
}
