import { render, screen } from "@testing-library/react";
import { ActivityRanking } from ".";
import { describe, it, expect } from "vitest";

describe("ActivityRanking", () => {
  it("renders activity rankings", () => {
    render(
      <ActivityRanking
        rankings={[
          {
            kind: "outdoor",
            label: "Outdoor Sightseeing",
            score: 90,
            reason: "Comfortable weather makes outdoor sightseeing ideal.",
          },
          {
            kind: "surfing",
            label: "Surfing",
            score: 70,
            reason: "Warm weather and a good breeze support surfing.",
          },
        ]}
      />,
    );

    expect(screen.getByText("Outdoor Sightseeing")).toBeInTheDocument();

    expect(screen.getByText("Surfing")).toBeInTheDocument();

    expect(screen.getByText(/90\/100/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Comfortable weather makes outdoor sightseeing ideal/i),
    ).toBeInTheDocument();
  });
});
