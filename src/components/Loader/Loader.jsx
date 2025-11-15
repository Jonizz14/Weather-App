import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
      <div className="loader">
        <div className="spinner"></div>
        <p className="loading-text">Loading weather data...</p>
      </div>
  );
};

export default Loader;
