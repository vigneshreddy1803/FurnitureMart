function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search sofas, beds, tables..."
        aria-label="Search furniture"
      />
    </div>
  );
}
export default SearchBar;