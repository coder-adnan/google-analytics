"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
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

  const getMetricValue = (row, index) => {
    return parseFloat(row?.metricValues?.[index]?.value || 0);
  };

  const metrics = [
    {
      name: "Sessions",
      index: 0,
      color: "rgba(75, 192, 192, 1)",
      type: "line",
    },
    {
      name: "Screen Page Views",
      index: 1,
      color: "rgba(153, 102, 255, 1)",
      type: "bar",
    },
    {
      name: "Users",
      index: 2,
      color: "rgba(255, 159, 64, 1)",
      type: "doughnut",
    },
    {
      name: "New Users",
      index: 3,
      color: "rgba(54, 162, 235, 1)",
      type: "line",
    },
    {
      name: "Avg. Engagement Time",
      index: 4,
      color: "rgba(255, 206, 86, 1)",
      type: "bar",
    },
    {
      name: "Bounce Rate",
      index: 5,
      color: "rgba(153, 102, 255, 1)",
      type: "doughnut",
    },
  ];

  const renderCharts = () =>
    metrics.map((metric) => {
      const labels =
        data?.rows?.map((row) => row?.dimensionValues?.[0]?.value) || []; // Dates from data
      const values =
        data?.rows?.map((row) => getMetricValue(row, metric.index)) || [];

      const chartData = {
        labels,
        datasets: [
          {
            label: metric.name,
            data: values,
            backgroundColor:
              metric.type === "doughnut"
                ? [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                  ]
                : `${metric.color}20`, // Semi-transparent background for other charts
            borderColor: metric.color,
            borderWidth: 2,
            fill: metric.type === "line",
            tension: metric.type === "line" ? 0.4 : 0,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: metric.type !== "line" },
          title: {
            display: true,
            text: metric.name,
            font: { size: 16 },
          },
        },
        scales: metric.type !== "doughnut" && {
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
        <div key={metric.name} style={{ flex: "1 1 45%", margin: "10px" }}>
          <div style={{ height: "300px" }}>
            {metric.type === "line" && (
              <Line data={chartData} options={options} />
            )}
            {metric.type === "bar" && (
              <Bar data={chartData} options={options} />
            )}
            {metric.type === "doughnut" && (
              <Doughnut data={chartData} options={options} />
            )}
          </div>
        </div>
      );
    });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {renderCharts()}
      </div>
    </div>
  );
};

export default Dashboard;
