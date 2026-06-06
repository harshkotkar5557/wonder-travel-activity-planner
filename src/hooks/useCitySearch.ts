import { useQuery } from "@tanstack/react-query";
import { searchCities } from "../api/cityApi";

export function useCitySearch(searchTerm: string) {
  return useQuery({
    queryKey: ["cities", searchTerm],
    queryFn: ({ signal }) => searchCities(searchTerm, signal),
    enabled: searchTerm.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}
