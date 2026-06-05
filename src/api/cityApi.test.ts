import { beforeEach, describe, expect, it, vi } from "vitest";
import { searchCities } from "./cityApi";

describe("searchCities", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    mockFetch.mockReset();
  });

  it("maps API response to City[]", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 1,
            name: "London",
            latitude: 51.5,
            longitude: -0.12,
            country: "United Kingdom",
            admin1: "England",
          },
        ],
      }),
    } as Response);

    const result = await searchCities("London");

    expect(result).toEqual([
      {
        id: 1,
        name: "London",
        latitude: 51.5,
        longitude: -0.12,
        country: "United Kingdom",
        admin1: "England",
      },
    ]);
  });

  it("throws error when city API fails", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    } as Response);

    await expect(searchCities("London")).rejects.toThrow(
      "Failed to fetch cities",
    );
  });
});
