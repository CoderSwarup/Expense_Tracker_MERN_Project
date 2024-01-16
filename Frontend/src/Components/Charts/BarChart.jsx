import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

export default function BarChart({ categories = [] }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Category Bar Chart Analysis",
      },
    },
    scales: {
      x: {
        barThickness: 30, // Adjust this value to control the width of the bars
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // Assuming categories is an array of objects with properties 'name' and 'totalAmountSpend'
  const labels = categories.map(
    (category) =>
      `${
        category.name.length > 10
          ? category.name.slice(0, 9) + "..."
          : category.name
      }`
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Total Amount Spend",
        maintainAspectRatio: false,
        data: categories.map((category) => category.totalAmountSpend),
        backgroundColor: [
          "rgba(255, 99, 133, 0.683)",
          "rgba(255, 159, 64, 0.683)",
          "rgba(255, 205, 86, 0.683)",
          "rgba(75, 192, 192, 0.683)",
          "rgba(54, 162, 235, 0.683)",
          "rgba(153, 102, 255, 0.683)",
          "rgba(201, 203, 207, 0.683)",
        ],
      },
    ],
  };

  return (
    <BarChartWrapper>
      <Bar options={options} data={data} />
    </BarChartWrapper>
  );
}

const BarChartWrapper = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px;
`;
