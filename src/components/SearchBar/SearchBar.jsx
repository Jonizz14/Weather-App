import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Shahar nomini kiriting..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Qidirish</button>
    </form>
  );
}
