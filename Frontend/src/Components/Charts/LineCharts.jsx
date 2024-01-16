import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

export default function LineCharts({ categories = [] }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Category Line Chart Analysis",
      },
    },
  };

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
        data: categories.map((category) => category.totalAmountSpend),
        borderColor: "rgba(255, 99, 133, 0.8)", // Set the line color
        fill: false, // Set to false if you don't want to fill the area under the line
      },
    ],
  };

  return (
    <LineChartWrapper>
      <Line options={options} data={data} />
    </LineChartWrapper>
  );
}

const LineChartWrapper = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px;
  height: 400px; // Adjust the height as needed
`;
