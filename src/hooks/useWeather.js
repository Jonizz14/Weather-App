import { useState } from "react";
import { fetchWeatherByCity, fetchForecast } from "../api/weatherApi";

export default function useWeather() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getWeather = async (city) => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchWeatherByCity(city);
            const forecastData = await fetchForecast(data.coord.lat, data.coord.lon);
            setWeather(data);
            setForecast(forecastData);
        } catch (err) {
            setError(err.message);
        } finally {
            // Ensure loader shows for at least 1 second to handle bad internet
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return { weather, forecast, loading, error, getWeather };
}
