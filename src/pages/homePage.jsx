import CoinCard from "../CoinCard";
import LimitCtrl from "../LimitCtrl";
import FilterList from "../FilterList";
import SortSelecter from "../SortSelecter";
import Spinner from "../Spinner";

export default function HomePage({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  isLoading,
  error,
}) {
  const onChange = (e) => {
    return setLimit(Number(e.target.value));
  };

  const filterCoin = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });
  return (
    <div>
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterList filter={filter} onFilterChange={setFilter} />
        <LimitCtrl limit={limit} onLimiteChange={onChange} />
        <SortSelecter sortBy={sortBy} onSortChange={setSortBy} />
      </div>
      {isLoading && <Spinner size="100%" />}
      {!isLoading && !error && (
        <main className="grid">
          {filterCoin.length > 0 ? (
            filterCoin.map((coin) => {
              return <CoinCard key={coin.id} coin={coin} />;
            })
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
}
