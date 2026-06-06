import { useEffect, useMemo, useRef, useState } from "react";

import { CitySearch } from "../../components/CitySearch";
import { ForecastStrip } from "../../components/ForecastStrip";
import { ActivityRanking } from "../../components/ActivityRanking";

import { useCitySearch } from "../../hooks/useCitySearch";
import { useForecast } from "../../hooks/useForecast";

import { rankActivities } from "../../core/rankActivities";
import { averageForecast } from "../../core/averageForecast";

import type { City } from "../../types";
import { useDebounce } from "../../hooks/useDebounce";

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);

  const {
    data: cities = [],
    isLoading: isCitiesLoading,
    error: citiesError,
  } = useCitySearch(selectedCity ? "" : debouncedSearchTerm.toLowerCase());

  const {
    data: forecast,
    isLoading: isForecastLoading,
    error: forecastError,
  } = useForecast(selectedCity);

  const rankings = useMemo(() => {
    if (!forecast) return [];
    return rankActivities(averageForecast(forecast));
  }, [forecast]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    setSelectedCity(null);
    setShowSuggestions(true);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);

    setSearchTerm(city.name);

    setShowSuggestions(false);
  };

   const handleFocus = () => {
    if (searchTerm.length >= 2 && !selectedCity) {
      setShowSuggestions(true);
    }
  };

  return (
    <main className="app">
      <h1>Travel Activity Planner</h1>

      <div ref={wrapperRef}>
        <CitySearch
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
        />
        {(isCitiesLoading || isForecastLoading) && <div className="loader" />}

        {!isCitiesLoading &&
          !selectedCity &&
          debouncedSearchTerm.length >= 2 &&
          cities.length === 0 && <p>No cities found.</p>}

        {showSuggestions && cities.length > 0 && (
          <ul className="city-results">
            {cities.map((city: City) => (
              <li key={city.id}>
                <button
                  type="button"
                  className="city-option"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="city-name">{city.name}</div>

                  <div className="city-location">
                    {city.admin1
                      ? `${city.admin1}, ${city.country}`
                      : city.country}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {citiesError && <p>Failed to load cities.</p>}
      {forecastError && <p>Failed to load forecast.</p>}

      {forecast && (
        <>
          <ForecastStrip forecast={forecast} />
          <ActivityRanking rankings={rankings} />
        </>
      )}
    </main>
  );
}
