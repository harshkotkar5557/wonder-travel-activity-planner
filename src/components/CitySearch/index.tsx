import "./index.style.css";

interface CitySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function CitySearch({ value, onChange }: CitySearchProps) {
  return (
    <div className="city-search">
      <input
        className="city-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search city..."
      />
    </div>
  );
}
