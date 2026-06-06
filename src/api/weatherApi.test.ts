import { describe, expect, it, vi, beforeEach } from "vitest";
import { getForecast } from "./weatherApi";

describe("getForecast", () => {
  let mockFetch: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockFetch = vi.spyOn(global, "fetch");
  });

  it("maps weather API response to Forecast", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        daily: {
          time: ["2026-06-05"],
          temperature_2m_max: [25],
          precipitation_sum: [2],
          wind_speed_10m_max: [10],
          snowfall_sum: [0],
        },
      }),
    } as Response);

    const city = {
      id: 1,
      name: "London",
      latitude: 51.5,
      longitude: -0.12,
      country: "United Kingdom",
    };

    const result = await getForecast(city);

    expect(result).toEqual({
      city,
      days: [
        {
          date: "2026-06-05",
          temperature: 25,
          rainfall: 2,
          windSpeed: 10,
          snowfall: 0,
        },
      ],
    });
  });

  it("throws error when weather API fails", async () => {
    mockFetch.mockResolvedValue({ ok: false } as Response);

    await expect(
      getForecast({
        id: 1,
        name: "London",
        latitude: 51.5,
        longitude: -0.12,
        country: "United Kingdom",
      }),
    ).rejects.toThrow("Failed to fetch weather forecast");
  });
});
