import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FaRupeeSign } from "react-icons/fa";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import { FcDoughnutChart } from "react-icons/fc";
import ExpenseCard from "../Components/CardComponent/ExpenseCard";

import CategoryDashBoard from "../Components/Category/CategoryDashBoard";
import DashBoardHeading from "../Components/DashBord/DashBoardHeading";

export default function DashBoard() {
  const { user } = useSelector((state) => state.user);
  return (
    <DashBoardContainer className="MainContainer">
      <DashBoardHeading></DashBoardHeading>
      <div className="container">
        <Category>
          <h1>Categories</h1>
          <CategoryDashBoard device="mobile" />
        </Category>

        {/* Expenses */}
        <Expenses>
          <h1>New Payments</h1>
          <div className="expense-container">
            <ExpenseCard />
          </div>
        </Expenses>

        {/* Chart Analysis */}
        <Charts>
          <h1>Analysis</h1>

          <div className="Date-Container d-flex">
            <div className="date-range">
              <p>Spend in Aug 1 - Aug 7</p>
              <h3 className="d-flex">
                <FaRupeeSign />
                27000/2000
              </h3>
            </div>
            <div className="used-money">
              <p>69% budget used</p>

              <FcDoughnutChart className="icon-dount" />
            </div>
          </div>

          <div className="Chart-Container">
            <DoughnutChart></DoughnutChart>
          </div>
        </Charts>
      </div>
    </DashBoardContainer>
  );
}

const DashBoardContainer = styled.div`
  .container {
    margin-top: 30px;
    padding: 10px;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: start;
    gap: 20px;
    h1 {
      width: 100%;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-size: 22px;
      text-transform: capitalize;
    }
  }
`;

const Category = styled.div``;
const Expenses = styled.div`
  .expense-container {
    color: #fff !important;
    padding: 0 10px;
    height: 90vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      background: #202329;
    }
  }
`;
const Charts = styled.div`
  .Date-Container {
    color: #fff !important;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    margin: 20px auto;
    background: #191c20;

    p {
      font-size: 14px;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      font-weight: 800;
      color: #ffffff8f;
      margin: 5px 0;
    }

    h3 {
      justify-content: start !important;
      gap: 10px;
      font-size: 16px;
    }
    .icon-dount {
      font-size: 20px !important;
      text-align: right;
      width: 100%;
    }
  }
  .Chart-Container {
    margin: 20px auto;
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    background: #191c20;
  }
`;
