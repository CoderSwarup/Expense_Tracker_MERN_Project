import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaRupeeSign } from "react-icons/fa";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import { FcDoughnutChart } from "react-icons/fc";
import CategoryDashBoard from "../Components/Category/CategoryDashBoard";
import DashBoardHeading from "../Components/DashBord/DashBoardHeading";
import { GetIncomesExpenses } from "../Store/Actions/IncomeExpenseActions";
import { GetCategoryList } from "../Store/Actions/CategoryActions";
import {
  getCurrentMonthAndDays,
  getMonthNames,
} from "../utils/getMonthAndNoOfDay";
import ChartContainer from "../Components/Charts/ChartContainer";
import TransactionCard from "../Components/CardComponent/TransactionCard";

// Sample Data
// const categories = [
//   { name: "Food", amount: 300 },
//   { name: "Transportation", amount: 150 },
//   { name: "Housing", amount: 500 },
//   { name: "Entertainment", amount: 200 },
//   { name: "Others", amount: 100 },

// ];

export default function DashBoard() {
  const dispatch = useDispatch();

  const { incomeexpenseslist } = useSelector((state) => state.incomeexpense);
  const { user } = useSelector((state) => state.user);
  const { categoryList } = useSelector((state) => state.category);

  const [selectedType, setSelectedType] = useState("Expense");
  const [filteredCategories, setFilteredCategories] = useState(categoryList);

  const { currentYear, currentMonth, numberOfDaysInMonth } =
    getCurrentMonthAndDays();
  const { monthShortForm } = getMonthNames(currentMonth);
  const [filteredData, setFilteredData] = useState([]);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    dispatch(GetIncomesExpenses());
    dispatch(GetCategoryList());
  }, [dispatch]);

  useEffect(() => {
    // Filter categories based on the selected type
    setFilteredCategories(
      categoryList.filter((category) => category.type === selectedType)
    );
  }, [selectedType, categoryList]);

  useEffect(() => {
    // Filter the data based on the current month and number of days
    const filteredData = incomeexpenseslist.filter((item) => {
      const itemDate = new Date(item.createddate);
      const itemMonth = itemDate.getMonth() + 1; // Adding 1 because months are 0-indexed
      const itemDay = itemDate.getDate();

      return itemMonth === currentMonth && itemDay <= numberOfDaysInMonth;
    });

    setFilteredData(filteredData);

    let totalSpend = filteredData.reduce((total, item) => {
      // Only add the amount if the category type matches the selectedType
      if (item.category.type === selectedType) {
        return total + item.amount;
      }
      return total;
    }, 0);
    setTotalSpend(totalSpend);
  }, [incomeexpenseslist, currentMonth, numberOfDaysInMonth, selectedType]);
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
            {incomeexpenseslist
              .slice()
              .reverse()
              .map((incomeexpense, i) => {
                return (
                  <TransactionCard key={i} incomeexpense={incomeexpense} />
                );
              })}
          </div>
        </Expenses>

        {/* Chart Analysis */}
        <Charts>
          <div className="ChatHeader">
            <h1>Category Analysis</h1>
            <div className="select-type">
              <select
                className="StyledSelect"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option className="StyledOption" value="Expense">
                  Expense
                </option>
                <option className="StyledOption" value="Income">
                  Income
                </option>
              </select>
            </div>
          </div>

          <div className="Date-Container d-flex">
            {selectedType === "Expense" ? (
              <>
                <div className="date-range">
                  <p>
                    Spend in {monthShortForm} 1 - {monthShortForm}{" "}
                    {numberOfDaysInMonth}
                  </p>
                  <h3 className="d-flex">
                    <FaRupeeSign />
                    {/* {data.reduce((total, item) => total + item.amount, 0)} */}
                    {totalSpend}/{user?.user?.monthlyBudget}
                  </h3>
                </div>
                <div className="used-money">
                  <p>
                    {(
                      ((filteredData.length > 0 ? totalSpend : 0) /
                        user?.user?.monthlyBudget) *
                      100
                    ).toFixed(0)}
                    % budget used
                  </p>

                  <FcDoughnutChart className="icon-dount" />
                </div>
              </>
            ) : (
              <>
                <div className="date-range">
                  <p>
                    Earned in {monthShortForm} 1 - {monthShortForm}{" "}
                    {numberOfDaysInMonth} 🤑
                  </p>
                  <h3 className="d-flex">
                    <FaRupeeSign />
                    {totalSpend}
                  </h3>
                </div>
              </>
            )}
          </div>

          <ChartContainer categoryList={filteredCategories}></ChartContainer>
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

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
      place-items: center;
    }

    @media screen and (max-width: 400px) {
      padding: 0;
    }
  }
`;

const Category = styled.div``;
const Expenses = styled.div`
  .expense-container {
    color: ${({ theme }) => {
      return theme.color.primaryContainer.text;
    }} !important;
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
      background: ${({ theme }) => {
        return theme.color.primaryContainer.Background;
      }};
    }
  }
`;
const Charts = styled.div`
  .Date-Container {
    color: ${({ theme }) => {
      return theme.color.primaryContainer.text;
    }} !important;
    width: 100%;
    height: 60px;
    padding: 10px;
    border-radius: 5px;
    margin: 20px auto;
    background: ${({ theme }) => {
      return theme.color.primaryContainer.Background;
    }};

    p {
      font-size: 14px;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      font-weight: 800;
      color: ${({ theme }) => {
        return theme.color.primaryContainer.textlight;
      }};
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
    background: ${({ theme }) => {
      return theme.color.primaryContainer.Background;
    }};
  }
  .select-type {
    margin: 5px 0;
  }
`;
