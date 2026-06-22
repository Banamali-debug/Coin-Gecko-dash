export default function SortSelecter({ sortBy, onSortChange }) {
  return (
    <div className="controls">
      <label htmlFor="sort">Sort By: </label>
      <select
        value={sortBy}
        id="sort"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="market_cap_desc">Market Cap (H-L)</option>
        <option value="market_cap_asc">Market Cap (L-H)</option>
        <option value="price_desc">Price (H-L)</option>
        <option value="price_asc">Price (L-H)</option>
        <option value="change_desc">24h change (H-L)</option>
        <option value="change_asc">24h change(L-H)</option>
      </select>
    </div>
  );
}
