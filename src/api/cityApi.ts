import type { City } from "../types";
import { GEOCODING_BASE_URL } from "./constants";
import type { GeocodingResponse } from "./type";

export async function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<City[]> {
  const response = await fetch(
    `${GEOCODING_BASE_URL}/search?name=${encodeURIComponent(query)}&count=10`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  const data: GeocodingResponse = await response.json();

  if (!data.results) {
    return [];
  }

  return data.results.map((city) => ({
    id: city.id,
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    country: city.country,
    admin1: city.admin1,
  }));
}
