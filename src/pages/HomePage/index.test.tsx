import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { HomePage } from ".";

vi.mock("../../hooks/useCitySearch", () => ({
  useCitySearch: vi.fn(),
}));
vi.mock("../../hooks/useForecast", () => ({
  useForecast: vi.fn(),
}));

import { useCitySearch } from "../../hooks/useCitySearch";
import { useForecast } from "../../hooks/useForecast";

const mockedCitySearch = vi.mocked(useCitySearch);
const mockedForecast = vi.mocked(useForecast);

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedForecast.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useForecast>);
  });

  it("shows city search error state", () => {
    mockedCitySearch.mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error("API failed"),
    } as unknown as ReturnType<typeof useCitySearch>);

    render(<HomePage />);
    expect(screen.getByText(/failed to load cities/i)).toBeInTheDocument();
  });

  it("shows suggestions when cities are returned", async () => {
    mockedCitySearch.mockReturnValue({
      data: [
        {
          id: 1,
          name: "London",
          latitude: 51.5,
          longitude: -0.12,
          country: "United Kingdom",
          admin1: "England",
        },
      ],
      isLoading: false,
      error: null,
    } as ReturnType<typeof useCitySearch>);

    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByRole("textbox"), "London");
    expect(screen.getByText("London")).toBeInTheDocument();
  });

  it("does NOT show 'No cities found' after a city is selected", async () => {
    mockedCitySearch.mockReturnValue({
      data: [
        {
          id: 1,
          name: "London",
          latitude: 51.5,
          longitude: -0.12,
          country: "United Kingdom",
          admin1: "England",
        },
      ],
      isLoading: false,
      error: null,
    } as ReturnType<typeof useCitySearch>);

    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByRole("textbox"), "London");
    await user.click(screen.getByText("London")); // select the city

    expect(screen.queryByText(/no cities found/i)).not.toBeInTheDocument();
  });

  it("hides the suggestion list after a city is selected", async () => {
    mockedCitySearch.mockReturnValue({
      data: [
        {
          id: 1,
          name: "Paris",
          latitude: 48.8,
          longitude: 2.3,
          country: "France",
        },
      ],
      isLoading: false,
      error: null,
    } as ReturnType<typeof useCitySearch>);

    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByRole("textbox"), "Paris");
    const option = screen.getByRole("button", { name: /paris/i });
    await user.click(option);

    expect(
      screen.queryByRole("button", { name: /paris/i }),
    ).not.toBeInTheDocument();
  });
});
