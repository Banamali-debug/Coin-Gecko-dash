import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
);

const CHART_URL = import.meta.env.VITE_COIN_URL;

export default function Coinchart({ coinId }) {
  const [ChartData, setChartData] = useState({ label: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchChat = async () => {
      console.log(coinId);
      const data = await fetch(
        `${CHART_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
      );
      const res = await data.json();
      const prices = res.prices.map((price) => ({
        x: price[0],
        y: price[1],
      }));
      setChartData({
        label: [],
        datasets: [
          {
            label: "price (USD)",
            data: prices,
            fill: true,
            borderColor: "#007bff",
            backgroundColor: "rgba(0,123,255,0.1)",
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });
      setLoading(false);
    };
    fetchChat();
  }, [coinId]);

  return (
    <div style={{ marginTop: "1rem", marginLeft: "1rem" }}>
      <Line
        data={ChartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
}
