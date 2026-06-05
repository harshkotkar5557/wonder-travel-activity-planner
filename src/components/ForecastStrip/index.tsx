import type { Forecast } from "../../types";
import "./index.style.css";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dayLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return DOW[new Date(y, m - 1, d).getDay()];
}

export function ForecastStrip({ forecast }: { forecast: Forecast }) {
  return (
    <section className="forecast-strip">
      <h2>{forecast.city.name}</h2>

      <div className="forecast-days">
        {forecast.days.map((day) => (
          <div key={day.date} className="day-card">
            <div className="dow">{dayLabel(day.date)}</div>
            <div className="temp">{Math.round(day.temperature)}°C</div>
            <div className="meta">Rain {day.rainfall} mm</div>
            <div className="meta">Wind {Math.round(day.windSpeed)} km/h</div>
            <div className="meta">Snow {day.snowfall} cm</div>
          </div>
        ))}
      </div>
    </section>
  );
}
