import type { Forecast } from "../types";

export interface AveragedWeather {
  temperature: number;
  rainfall: number;
  windSpeed: number;
  snowfall: number;
}

export function averageForecast(forecast: Forecast): AveragedWeather {
  const days = forecast.days;
  const n = days.length || 1;
  const sum = days.reduce(
    (acc, d) => ({
      temperature: acc.temperature + d.temperature,
      rainfall: acc.rainfall + d.rainfall,
      windSpeed: acc.windSpeed + d.windSpeed,
      snowfall: acc.snowfall + d.snowfall,
    }),
    { temperature: 0, rainfall: 0, windSpeed: 0, snowfall: 0 },
  );
  return {
    temperature: sum.temperature / n,
    rainfall: sum.rainfall / n,
    windSpeed: sum.windSpeed / n,
    snowfall: sum.snowfall / n,
  };
}
