import type { City, Forecast } from "../types";
import { WEATHER_BASE_URL } from "./constants";
import type { WeatherResponse } from "./type";

export async function getForecast(
  city: City,
  signal?: AbortSignal,
): Promise<Forecast> {
  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    daily:
      "temperature_2m_max,precipitation_sum,wind_speed_10m_max,snowfall_sum",
    forecast_days: "7",
  });

  const response = await fetch(`${WEATHER_BASE_URL}/forecast?${params}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weather forecast");
  }

  const data: WeatherResponse = await response.json();
  const d = data.daily;

  const days = d.time.map((date, i) => ({
    date,
    temperature: d.temperature_2m_max[i] ?? 0,
    rainfall: d.precipitation_sum[i] ?? 0,
    windSpeed: d.wind_speed_10m_max[i] ?? 0,
    snowfall: d.snowfall_sum[i] ?? 0,
  }));

  return { city, days };
}
