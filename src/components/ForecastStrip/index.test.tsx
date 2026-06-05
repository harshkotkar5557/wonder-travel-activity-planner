import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ForecastStrip } from ".";
import type { Forecast } from "../../types";

const forecast: Forecast = {
  city: {
    id: 1,
    name: "London",
    latitude: 51.5,
    longitude: -0.12,
    country: "United Kingdom",
  },
  days: [
    {
      date: "2026-06-05",
      temperature: 21.6,
      rainfall: 2,
      windSpeed: 10.4,
      snowfall: 0,
    },
    {
      date: "2026-06-06",
      temperature: 18.2,
      rainfall: 5,
      windSpeed: 15,
      snowfall: 0,
    },
    {
      date: "2026-06-07",
      temperature: 15.5,
      rainfall: 0,
      windSpeed: 8,
      snowfall: 0,
    },
  ],
};

describe("ForecastStrip", () => {
  it("renders the city name", () => {
    render(<ForecastStrip forecast={forecast} />);
    expect(screen.getByText("London")).toBeInTheDocument();
  });

  it("renders one card per forecast day", () => {
    render(<ForecastStrip forecast={forecast} />);
    const tempCards = screen.getAllByText(/°C/);
    expect(tempCards).toHaveLength(3);
  });

  it("rounds the temperature for display", () => {
    render(<ForecastStrip forecast={forecast} />);
    expect(screen.getByText("22°C")).toBeInTheDocument();
    expect(screen.getByText("18°C")).toBeInTheDocument();
  });

  it("shows rain, wind, and snow details for a day", () => {
    render(<ForecastStrip forecast={forecast} />);

    expect(screen.getByText("Rain 2 mm")).toBeInTheDocument();
    expect(screen.getByText("Wind 10 km/h")).toBeInTheDocument();
    expect(screen.getAllByText("Snow 0 cm")).toHaveLength(3);
  });

  it("handles an empty forecast without crashing", () => {
    render(<ForecastStrip forecast={{ ...forecast, days: [] }} />);
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.queryAllByText(/°C/)).toHaveLength(0);
  });
});
