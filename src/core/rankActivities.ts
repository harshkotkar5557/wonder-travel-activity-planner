import type { ActivityRanking } from "../types";
import type { AveragedWeather } from "./averageForecast";

export function rankActivities(weather: AveragedWeather): ActivityRanking[] {
  const { temperature, rainfall, windSpeed, snowfall } = weather;

  const rankings: ActivityRanking[] = [
    {
      kind: "skiing",
      label: "Skiing",
      score: getSkiingScore(temperature, snowfall),
      reason: getSkiingReason(temperature, snowfall),
    },
    {
      kind: "surfing",
      label: "Surfing",
      score: getSurfingScore(temperature, windSpeed),
      reason: getSurfingReason(temperature, windSpeed),
    },
    {
      kind: "indoor",
      label: "Indoor Sightseeing",
      score: getIndoorScore(rainfall, snowfall),
      reason: getIndoorReason(rainfall, snowfall),
    },
    {
      kind: "outdoor",
      label: "Outdoor Sightseeing",
      score: getOutdoorScore(temperature, rainfall, windSpeed),
      reason: getOutdoorReason(temperature, rainfall, windSpeed),
    },
  ];

  return rankings.sort((a, b) => b.score - a.score);
}

function clamp(score: number): number {
  return Number(Math.max(0, Math.min(100, score)).toFixed(0));
}

function getSkiingScore(temperature: number, snowfall: number): number {
  let score = 0;
  score += Math.min(snowfall * 10, 70);
  if (temperature < 10) {
    score += ((10 - temperature) / 10) * 30;
  }
  return clamp(score);
}

function getSurfingScore(temperature: number, windSpeed: number): number {
  let score = 0;
  if (temperature > 15) {
    score += Math.min(((temperature - 15) / 10) * 40, 40);
  }
  if (windSpeed >= 15 && windSpeed <= 30) {
    score += 60;
  } else if (windSpeed > 30) {
    score += 30;
  } else if (windSpeed >= 8) {
    score += 25;
  }
  return clamp(score);
}

function getIndoorScore(rainfall: number, snowfall: number): number {
  let score = 40;
  score += rainfall * 6;
  score += snowfall * 4;
  return clamp(score);
}

function getOutdoorScore(
  temperature: number,
  rainfall: number,
  windSpeed: number,
): number {
  let score = 100;
  if (temperature < 15) score -= (15 - temperature) * 3;
  if (temperature > 28) score -= (temperature - 28) * 3;

  score -= rainfall * 5;
  if (windSpeed > 20) score -= (windSpeed - 20) * 2;
  return clamp(score);
}

function getSkiingReason(temperature: number, snowfall: number): string {
  if (snowfall > 5 && temperature < 5) {
    return "Good snowfall and cold temperatures make skiing favorable.";
  }
  if (snowfall > 2) {
    return "Some snow supports basic skiing conditions.";
  }
  return "Limited snowfall reduces skiing suitability.";
}

function getSurfingReason(temperature: number, windSpeed: number): string {
  if (temperature > 20 && windSpeed >= 15 && windSpeed <= 30) {
    return "Warm weather and a good breeze support surfing.";
  }
  if (windSpeed >= 15) {
    return "Wind conditions may support surfing.";
  }
  return "Light winds make surfing less ideal.";
}

function getIndoorReason(rainfall: number, snowfall: number): string {
  if (rainfall > 5 || snowfall > 5) {
    return "Wet weather makes indoor activities a strong choice.";
  }
  if (rainfall > 0) {
    return "A little rain makes indoor options worth considering.";
  }
  return "A reasonable backup if outdoor plans change.";
}

function getOutdoorReason(
  temperature: number,
  rainfall: number,
  windSpeed: number,
): string {
  if (
    temperature >= 15 &&
    temperature <= 28 &&
    rainfall < 2 &&
    windSpeed < 20
  ) {
    return "Comfortable, dry weather makes outdoor sightseeing ideal.";
  }
  if (rainfall > 5) {
    return "Rain may limit outdoor sightseeing.";
  }
  return "Conditions are workable for outdoor sightseeing.";
}
