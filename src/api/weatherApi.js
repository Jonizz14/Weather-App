const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherByCity = async (city) => {
    const res = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
    if (!res.ok) throw new Error("Shahar topilmadi!");
    return res.json();
}

export const fetchForecast = async (lat, lon) => {
    const res = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error("Prognoz olishda xato!");
    return res.json();
};