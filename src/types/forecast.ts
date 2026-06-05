import type { City } from "./city";

export interface DailyWeather {
  date: string;
  temperature: number;
  rainfall: number;
  windSpeed: number;
  snowfall: number;
}

export interface Forecast {
  city: City;
  days: DailyWeather[];
}
