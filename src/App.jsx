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

  if (isLoading) {
    return <Loader text="Ob-havo maʼlumotlari yuklanmoqda..." />;
  }

  return <Router />;
}
