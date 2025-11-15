import React, { useState, useEffect } from "react";
import Router from "./router";
import Loader from "./components/Loader/Loader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      let timeOfDay = 'night';
      if (hour >= 6 && hour < 12) timeOfDay = 'morning';
      else if (hour >= 12 && hour < 17) timeOfDay = 'noon';
      else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
      else timeOfDay = 'night';
      document.body.setAttribute('data-time', timeOfDay);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Loader text="Loading weather data..." />;
  }

  return <Router />;
}
