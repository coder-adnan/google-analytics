"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        setData(response.data);
        console.log("API Response:", response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load analytics data.");
      }
    };

    fetchAnalyticsData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Helper functions for parsing data
  const getMetricValue = (row, index) =>
    parseFloat(row?.metricValues?.[index]?.value || 0);

  const getDimensionValue = (row, index) =>
    row?.dimensionValues?.[index]?.value || "Unknown";

  // Chart Data for Sessions and Page Views
  const chartData1 = {
    labels: data.rows.map((row) => getDimensionValue(row, 0)), // Dates
    datasets: [
      {
        label: "Sessions",
        data: data.rows.map((row) => getMetricValue(row, 0)),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: "Screen Page Views",
        data: data.rows.map((row) => getMetricValue(row, 1)),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  // Chart Data for Bounce Rate
  const chartData2 = {
    labels: data.rows.map((row) => getDimensionValue(row, 1)), // Countries
    datasets: [
      {
        label: "Bounce Rate",
        data: data.rows.map((row) => getMetricValue(row, 5)), // Bounce Rate
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Google Analytics Dashboard",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: "Metrics",
          font: { size: 14 },
        },
      },
      y: {
        grid: { color: "rgba(200, 200, 200, 0.2)" },
        title: {
          display: true,
          text: "Values",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "500px",
        }}
      >
        <div style={{ width: "48%" }}>
          <Line data={chartData1} options={options} />
        </div>
        <div style={{ width: "48%" }}>
          <Line data={chartData2} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
