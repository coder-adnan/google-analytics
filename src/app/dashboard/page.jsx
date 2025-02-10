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

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        setData(response.data);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const labels =
    data?.rows?.map((row) => row?.dimensionValues?.[0]?.value) || [];
  const values =
    data?.rows?.map((row) => parseFloat(row?.metricValues?.[0]?.value || 0)) ||
    [];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Visitors",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Visitors",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: { display: true, text: "Date", font: { size: 14 } },
      },
      y: {
        grid: { color: "rgba(200, 200, 200, 0.2)" },
        title: { display: true, text: "Value", font: { size: 14 } },
      },
    },
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <div style={{ height: "300px", width: "100%" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
