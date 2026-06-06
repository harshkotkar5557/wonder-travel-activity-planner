import "./index.style.css";

interface CitySearchProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
}

export function CitySearch({ value, onChange, onFocus }: CitySearchProps) {
  return (
    <div className="city-search">
      <input
        className="city-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder="Search city..."
      />
    </div>
  );
}