import React from "react";
import { Doughnut } from "react-chartjs-2";

// Smaple Data
// const categories = [
//   { name: "Food", amount: 300 },
//   // { name: "Transportation", amount: 150 },
//   // { name: "Housing", amount: 500 },
//   // { name: "Entertainment", amount: 200 },
//   // { name: "Others", amount: 100 },
//   // Additional 10 categories
// ];

export default function DoughnutChart({ categories = [] }) {
  const dataset = {
    data: categories.map((category) => category.totalAmountSpend),
    borderColor: "black",
    backgroundColor: [
      "rgba(255, 99, 133, 0.783)",
      "rgba(255, 160, 64,0.783)",
      "rgba(255, 204, 86, 0.783)",
      "rgba(75, 192, 192, 0.783)",
      "rgba(54, 162, 235, 0.783)",
      "rgba(153, 102, 255, 0.783)",
      "rgba(201, 203, 207, 0.783)",
    ],
    borderColor: [
      "rgb(255, 99, 132)",
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
      "rgb(153, 102, 255)",
      "rgb(201, 203, 207)",
    ],
    borderWidth: 2,
  };

  const sampleData = {
    labels: categories.map((category) => category.name),
    datasets: [dataset],
  };

  const sampleOptions = {
    title: {
      display: true,
      text: "Expense Categories",
    },
  };

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "10px",
        width: "400px",
        margin: "auto",
      }}
    >
      {categories && categories.length > 0 ? (
        <>
          <Doughnut data={sampleData} options={sampleOptions} />
          <h2
            style={{
              margin: "18px 0",
            }}
          >
            Most Used Categories
          </h2>
        </>
      ) : (
        <h2>No Any Categories Created</h2>
      )}
    </div>
  );
}
