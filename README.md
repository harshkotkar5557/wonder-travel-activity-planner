# Travel Activity Planner

A React + TypeScript application that allows users to search for a city, view weather information, and receive ranked activity recommendations based on weather conditions.

## Features

- City search using Open-Meteo Geocoding API
- Weather forecast display
  - Temperature
  - Rainfall
  - Wind Speed
  - Snowfall

- Activity recommendations
  - Skiing
  - Surfing
  - Indoor Sightseeing
  - Outdoor Sightseeing

- Debounced search
- Loading and error states
- Unit and component tests

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- Vitest
- React Testing Library

## Running the Application

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Running Tests

```bash
npm run test
```

## Build

```bash
npm run build
```

## Architecture

```text
src/
├── api/
├── components/
├── core/
├── hooks/
├── pages/
├── providers/
└── types/
```

- `api` - API integration and response mapping
- `components` - Reusable UI components
- `core` - Activity ranking logic
- `hooks` - Custom hooks and React Query integration

## Ranking Logic

Activities are ranked using a simple weather-based scoring system.

- Skiing → snowfall and temperature
- Surfing → wind speed and temperature
- Indoor Sightseeing → rainfall and snowfall
- Outdoor Sightseeing → temperature, rainfall, and wind speed

Scores are normalized between 0 and 100 and displayed in descending order.

## Notes

- React Query is used for caching and server-state management.
- GraphQL was not introduced because the application consumes third-party REST APIs.
- The ranking algorithm is intentionally simple and deterministic for maintainability and testing.
