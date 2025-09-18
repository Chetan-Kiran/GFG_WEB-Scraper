import React, { useState } from "react";
import "./GFG_scraper.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function GFG_scraper() {
  const [counts, setCounts] = useState([]);
  const [dates, setDates] = useState({});
  const [username, setUsername] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);

  // Prepare chart data (ensure chronological order)
  const labelsIso = Object.keys(dates).sort((a, b) => a.localeCompare(b));

  // day numbers only (01 → 1)
  const labelsDay = labelsIso.map((d) => String(Number(d.split("-")[2])));

  // aligned data points
  const dataPoints = labelsIso.map((d) => dates[d] ?? 0);

  // Fetch helper
  const handleFetch = () => {
    fetchData();
    fetchMonth();
  };

  const chartData = {
    labels: labelsDay, // ✅ Correct key name
    datasets: [
      {
        label: "Daily Submissions",
        data: dataPoints,
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      // ✅ should be "interaction", not "interactions"
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      point: { radius: 3, hoverRadius: 6, hitRadius: 8 },
      line: { tension: 0.3 },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (items) => {
            const idx = items[0]?.dataIndex ?? 0;
            return labelsIso[idx] || "";
          },
          label: (item) => `Daily Submissions: ${item.formattedValue}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (value, index) {
            return labelsDay[index]; // ✅ use correct array
          },
          maxRotation: 0,
          autoSkip: false,
        },
      },
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api-gfg-scrp.onrender.com/api/problems/${username}`
      );
      const result = await response.json();
      setCounts([result.counts]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonth = async () => {
    const response = await fetch(
      `https://api-gfg-scrp.onrender.com/api/problems/${username}?month=${month}`
    );
    const result = await response.json();

    const year = 2025;
    const allDays = getDaysInMonth(year, parseInt(month));
    const sortedEntries = Object.entries(result.monthlySubmissions || {}).sort(
      ([a], [b]) => a.localeCompare(b)
    );
    const sortedObject = Object.fromEntries(sortedEntries);

    const filledDate = {};
    allDays.forEach((day) => {
      filledDate[day] = sortedObject?.[day] || 0;
    });

    setDates(filledDate);
    return result;
  };

  function getDaysInMonth(year, month) {
    const days = [];
    const date = new Date(year, month - 1, 1);
    while (date.getMonth() === month - 1) {
      const day = date.toISOString().split("T")[0];
      days.push(day);
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  return (
    <div className="container">
      <div className="controls">
        <input
          type="text"
          placeholder="Enter GFG ID..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleFetch();
            }
          }}
          className="input-box"
        />

        <form>
          <label>select month:</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </form>
        <button onClick={handleFetch}>Fetch</button>
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          counts.length > 0 && (
            <ul>
              {counts.map((item, idx) => (
                <li key={idx}>
                  <p>School: {item.School}</p>
                  <p>Basic: {item.Basic}</p>
                  <p>Easy: {item.Easy}</p>
                  <p>Medium: {item.Medium}</p>
                  <p>Hard: {item.Hard}</p>
                  <p>
                    <b>Total: {item.Total}</b>
                  </p>
                </li>
              ))}
            </ul>
          )
        )}
      </div>

      <div className="chart-wrapper">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default GFG_scraper;
