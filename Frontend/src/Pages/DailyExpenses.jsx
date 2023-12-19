import React from "react";
import styled from "styled-components";
import DashBoardHeading from "../Components/DashBord/DashBoardHeading";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import ExpenseCard from "../Components/CardComponent/ExpenseCard";

import { TbCoinRupee } from "react-icons/tb";

export default function DailyExpenses() {
  return (
    <Wrapper className="MainContainer">
      <DashBoardHeading />

      <div className="daily-container">
        <div className="todays-spending-chart">
          <div className="total-money-spend  black-bg">
            <h2>
              Today's Spending{" "}
              <span className="spend">
                {" "}
                <TbCoinRupee />
                400
              </span>{" "}
            </h2>
            <h2>
              Today's Earn{" "}
              <span className="earn">
                {" "}
                <TbCoinRupee />
                339
              </span>
            </h2>
          </div>
          <div className="spendchart black-bg">
            <DoughnutChart />
          </div>
        </div>
        <div className="spend-category">
          <ExpenseCard></ExpenseCard>
          <ExpenseCard></ExpenseCard>
          <ExpenseCard></ExpenseCard>
          <ExpenseCard></ExpenseCard>
          <ExpenseCard></ExpenseCard>
          <ExpenseCard></ExpenseCard>
          <ExpenseCard></ExpenseCard>
          <ExpenseCard></ExpenseCard>
          <ExpenseCard></ExpenseCard>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: #fff !important;
  .daily-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-content: center;
  }
  .black-bg {
    background: ${({ theme }) => {
      return theme.color.mainBg;
    }};
    width: 400px;
    text-align: center;
    padding: 5px 10px;
    border: 0.4px solid #fff;
    border-radius: 15px;
  }

  .total-money-spend {
    font-weight: 300;

    h2 {
      font-size: 20px;
      margin: 10px auto;
      min-width: 70%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;

      span {
        font-size: 23px;
        margin: 5px 0;
        display: flex;
        background: red;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 5px;
      }

      .earn {
        background: green;
      }
    }
  }

  .todays-spending-chart {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .spend-category {
    height: 80vh;
    padding: 10px;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
