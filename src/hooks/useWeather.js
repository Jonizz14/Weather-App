import { useState, useCallback, useEffect } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords, fetchForecast } from "../api/weatherApi";

export default function useWeather() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [locationError, setLocationError] = useState(null);

    const getWeather = useCallback(async (city) => {
        // Clear previous data immediately
        setWeather(null);
        setForecast(null);
        setError(null);

        // Show loader instantly
        setLoading(true);

        try {
            const data = await fetchWeatherByCity(city);
            const forecastData = await fetchForecast(data.coord.lat, data.coord.lon);

            // Data is loaded, but keep loader for 1 more second
            setTimeout(() => {
                setWeather(data);
                setForecast(forecastData);
                setLoading(false);
            }, 1000);
        } catch (err) {
            setError(err.message);
            // Hide loader on error
            setLoading(false);
        }
    }, []);

    // Auto-load current location weather on mount
    useEffect(() => {
        const loadCurrentLocationWeather = async () => {
            if (navigator.geolocation) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, {
                            timeout: 15000,
                            enableHighAccuracy: true
                        });
                    });

                    const { latitude, longitude } = position.coords;

                    // Get city name from coordinates
                    const geoResponse = await fetch(
                        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
                    );
                    const geoData = await geoResponse.json();

                    if (geoData.length > 0) {
                        const cityName = geoData[0].name;
                        await getWeather(cityName);
                    } else {
                        console.log("No city found for coordinates");
                    }
                } catch (error) {
                    console.log("Could not get current location weather:", error.message);
                    // Don't load default city, let user search manually
                }
            } else {
                console.log("Geolocation not supported");
            }
        };

        loadCurrentLocationWeather();
    }, [getWeather]);

    const getWeatherByCoords = useCallback(async (lat, lon) => {
        // Clear previous data immediately
        setWeather(null);
        setForecast(null);
        setError(null);

        // Show loader instantly
        setLoading(true);

        try {
            const data = await fetchWeatherByCoords(lat, lon);
            const forecastData = await fetchForecast(lat, lon);

            // Data is loaded, but keep loader for 1 more second
            setTimeout(() => {
                setWeather(data);
                setForecast(forecastData);
                setLoading(false);
            }, 1000);
        } catch (err) {
            setError(err.message);
            // Hide loader on error
            setLoading(false);
        }
    }, []);

    const clearLocationError = () => setLocationError(null);

    const retryLocation = async () => {
        clearLocationError();
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        timeout: 15000,
                        enableHighAccuracy: true
                    });
                });

                const { latitude, longitude } = position.coords;

                const geoResponse = await fetch(
                    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
                );
                const geoData = await geoResponse.json();

                if (geoData.length > 0) {
                    const cityName = geoData[0].name;
                    await getWeather(cityName);
                } else {
                    setLocationError("No city found for your location");
                }
            } catch (error) {
                console.log("Could not get current location weather:", error.message);
                let errorMessage = "Unable to get your location.";
                if (error.code === 1) {
                    errorMessage = "Location permission denied. Please allow location access in your browser settings.";
                } else if (error.code === 2) {
                    errorMessage = "Location unavailable. Please check your GPS settings.";
                } else if (error.code === 3) {
                    errorMessage = "Location request timed out. Please try again.";
                }
                setLocationError(errorMessage);
            }
        } else {
            setLocationError("Geolocation not supported by this browser");
        }
    };

    return { weather, forecast, loading, error, locationError, getWeather, getWeatherByCoords, clearLocationError, retryLocation };
}
