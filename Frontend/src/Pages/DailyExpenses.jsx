import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashBoardHeading from "../Components/DashBord/DashBoardHeading";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import Button from "../Components/StyleComponent/Button";
import { TbCoinRupee } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { GetIncomesExpenses } from "../Store/Actions/IncomeExpenseActions";
import TransactionCard from "../Components/CardComponent/TransactionCard";

export default function DailyExpenses() {
  let { incomeexpenseslist } = useSelector((state) => state.incomeexpense);
  const [displayList, setDisplayList] = useState([]);
  const dispatch = useDispatch();
  const [incomevalue, setIncomeValue] = useState(0);
  const [expensevalue, setExpenseValue] = useState(0);

  //Get Todays Date
  const CurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const todaysDate = date.getDate();
    const month = date.getMonth() + 1;
    return `${year}-${("" + month).padStart(2, "0")}-${todaysDate}`;
  };
  const date = CurrentDate();
  console.log(date);

  useEffect(() => {
    dispatch(GetIncomesExpenses());
  }, []);

  const FilterTransaction = (list, type = "Expense") => {
    let filtertrasaction = 0;
    list
      .filter((data) => data.category.type === type)
      .map((data) => {
        filtertrasaction += data.amount;
      });

    return filtertrasaction;
  };

  useEffect(() => {
    const newlist = incomeexpenseslist.filter((data) => {
      return data.createddate.split("T")[0] === date;
    });

    setExpenseValue(FilterTransaction(newlist, "Expense"));
    setIncomeValue(FilterTransaction(newlist, "Income"));
    console.log(newlist);
    setDisplayList(newlist);
  }, [incomeexpenseslist]);
  return (
    <Wrapper className="MainContainer">
      <DashBoardHeading />

      {displayList && displayList.length > 0 ? (
        <div className="daily-container">
          <div className="todays-spending-chart">
            <div className="total-money-spend  black-bg">
              <h2>
                Today's Spending
                <span className="spend">
                  {" "}
                  <TbCoinRupee />
                  {expensevalue}
                </span>{" "}
              </h2>
              <h2>
                Today's Earn{" "}
                <span className="earn">
                  {" "}
                  <TbCoinRupee />
                  {incomevalue}
                </span>
              </h2>
            </div>
            <div className="spendchart black-bg">
              <DoughnutChart />
            </div>
          </div>
          <div>
            <h2>Todays Transactions </h2>
            <div className="spend-category">
              {displayList.map((incomeexpense, i) => {
                return (
                  <TransactionCard key={i} incomeexpense={incomeexpense} />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Nothing>
          <h2>Today Is Not Any Transaction is Created </h2>
          <img src="/assets/NoItems.jpg" alt="noitem" />
          <Button text="Create New Transaction"></Button>
        </Nothing>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: ${({ theme }) => {
    return theme.color.primaryContainer.text;
  }} !important;
  .daily-container {
    margin: 15px 0;
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-content: center;
  }
  .black-bg {
    background: ${({ theme }) => {
      return theme.color.primaryContainer.Background;
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
    max-height: 85vh;
    overflow-y: scroll;
    padding: 0 5px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Nothing = styled.div`
  width: 100%;
  margin: 20px 0;
  height: 70vh;
  display: grid;
  place-items: center;
  h2 {
    font-weight: 800;
    font-size: 30px;
    /* background: linear-gradient(to right, #ff7272, #7e7eff);
    color: transparent;
    -webkit-text-stroke-color: white;
    -webkit-background-clip: text; */
  }
  img {
    width: 400px;
  }
`;
