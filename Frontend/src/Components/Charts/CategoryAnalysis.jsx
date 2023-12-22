import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DashBoardHeading from "../DashBord/DashBoardHeading";
import { Bar } from "react-chartjs-2";

export default function CategoryAnalysis() {
  const { catid } = useParams();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [30, 50, 20, 70, 45, 60, 35, 75, 40, 55, 25, 90],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      //   {
      //     label: "Dataset 2",
      //     data: [60, 25, 80, 40, 55, 70, 45, 30, 65, 20, 50, 75],
      //     backgroundColor: "rgba(53, 162, 235, 0.5)",
      //   },
    ],
  };

  console.log(catid);

  return (
    <CatAnalysisWrapper className="MainContainer">
      <DashBoardHeading />
      <div className="cat-analysis-container">
        <h2>Analysis of CatName Category </h2>
      </div>
      <Bar options={options} data={data} />
    </CatAnalysisWrapper>
  );
}

const CatAnalysisWrapper = styled.div`
  padding: 30px;
`;
