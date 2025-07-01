import { useState } from "react";
import axios from "axios";

export function useWeather() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API;

  const fetchByLocation = async () => {
    if (!location) return;
    try {
      setError("");
      setLoading(true);

      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json`,
        {
          params: {
            key: API_KEY,
            q: location,

          },
        }
      );
      console.log(res.data);
      setWeather(res.data);
    } catch {
      setError("Location not found.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchByGeo = () => {
    if (!navigator.geolocation) {
      setError("Geolocalitzation not suported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          setError("");
          setLoading(true);
          const res = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json`,
            {
              params: {
                key: API_KEY,
                q: `${latitude},${longitude}`,
                days: 7,
              },
            }
          );
          setWeather(res.data);
          setLocation(res.data.location.name);
        } catch {
          setError("Couldn't find the city location.");
          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      () => setError("Privilage error")
    );
  };

  return {
    location,
    setLocation,
    weather,
    loading,
    error,
    fetchByLocation,
    fetchByGeo,
  };
}
