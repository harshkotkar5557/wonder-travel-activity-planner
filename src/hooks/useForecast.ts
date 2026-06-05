import { useQuery } from "@tanstack/react-query";
import { getForecast } from "../api/weatherApi";
import type { City } from "../types";

export function useForecast(city: City | null) {
  return useQuery({
    queryKey: ["forecast", city?.latitude, city?.longitude],
    queryFn: ({ signal }) => {
      if (!city) {
        throw new Error("City is required");
      }
      return getForecast(city, signal);
    },
    enabled: !!city,
    staleTime: 1000 * 60 * 10,
  });
}
