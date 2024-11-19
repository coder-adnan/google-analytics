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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: ["Sessions", "Screen Page Views"],
    datasets: [
      {
        label: "Sessions",
        data: data.rows.map((row) => row.metricValues[0].value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: "Screen Page Views",
        data: data.rows.map((row) => row.metricValues[1].value),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Google Analytics Data",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Metrics",
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        title: {
          display: true,
          text: "Values",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Dashboard;
