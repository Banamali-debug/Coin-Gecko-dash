import { useState, useRef, useEffect } from "react";
import HomePage from "./pages/homePage";
import AboutPage from "./pages/aboutPage";
import Header from "./Header";
import NotfoundPage from "./pages/not-found";
import CoinDetailPage from "./pages/coinDetails";
import { Routes, Route } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setCoins(data);
        // console.log(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.msg);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              isLoading={isLoading}
              error={error}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetailPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
}
