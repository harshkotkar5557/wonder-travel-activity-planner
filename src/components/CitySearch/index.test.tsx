import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CitySearch } from ".";

describe("CitySearch", () => {
  it("renders an input with the given value", () => {
    render(<CitySearch value="London" onChange={() => {}} />);

    expect(screen.getByRole("textbox")).toHaveValue("London");
  });

  it("calls onChange for each character the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<CitySearch value="" onChange={onChange} />);

    await user.type(screen.getByRole("textbox"), "Paris");
    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
