import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from ".";

vi.mock("../../hooks/useCitySearch", () => ({
  useCitySearch: vi.fn(),
}));

vi.mock("../../hooks/useForecast", () => ({
  useForecast: vi.fn(),
}));

import { useCitySearch } from "../../hooks/useCitySearch";
import { useForecast } from "../../hooks/useForecast";

describe("HomePage", () => {
  it("shows city search error state", () => {
    vi.mocked(useCitySearch).mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error("API failed"),
    } as ReturnType<typeof useCitySearch>);

    vi.mocked(useForecast).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useForecast>);

    render(<HomePage />);

    expect(screen.getByText(/failed to load cities/i)).toBeInTheDocument();
  });
});
