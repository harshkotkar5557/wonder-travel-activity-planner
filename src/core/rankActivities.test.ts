import { describe, expect, it } from "vitest";
import { rankActivities } from "./rankActivities";
import type { AveragedWeather } from "./averageForecast";

const base: AveragedWeather = {
  temperature: 25,
  rainfall: 0,
  windSpeed: 10,
  snowfall: 0,
};

describe("rankActivities", () => {
  it("should rank skiing highest for snowy and cold weather", () => {
    const rankings = rankActivities({ ...base, temperature: -5, snowfall: 10 });
    expect(rankings[0].kind).toBe("skiing");
  });

  it("should rank outdoor highest for warm, dry, low-wind weather", () => {
    const rankings = rankActivities({
      ...base,
      temperature: 24,
      rainfall: 0,
      windSpeed: 8,
      snowfall: 0,
    });
    expect(rankings[0].kind).toBe("outdoor");
  });

  it("should rank indoor higher when rainfall is high", () => {
    const rankings = rankActivities({
      ...base,
      temperature: 22,
      rainfall: 20,
      windSpeed: 10,
    });
    expect(rankings[0].kind).toBe("indoor");
  });

  it("should rank surfing higher for warm weather with suitable wind", () => {
    const rankings = rankActivities({
      ...base,
      temperature: 26,
      windSpeed: 22,
    });
    expect(rankings[0].kind).toBe("surfing");
  });

  it("should keep all scores between 0 and 100", () => {
    const rankings = rankActivities({
      temperature: 50,
      rainfall: 100,
      windSpeed: 100,
      snowfall: 100,
    });
    rankings.forEach((a) => {
      expect(a.score).toBeGreaterThanOrEqual(0);
      expect(a.score).toBeLessThanOrEqual(100);
    });
  });

  it("should sort activities by score in descending order", () => {
    const rankings = rankActivities(base);
    for (let i = 1; i < rankings.length; i++) {
      expect(rankings[i - 1].score).toBeGreaterThanOrEqual(rankings[i].score);
    }
  });
});
