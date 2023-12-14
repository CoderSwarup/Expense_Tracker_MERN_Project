import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { GiMoneyStack } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import { FcDoughnutChart } from "react-icons/fc";

export default function DashBoard() {
  const { user } = useSelector((state) => state.user);
  return (
    <DashBoardContainer className="MainContainer">
      <div className="heading-name">
        <h1>Hi , {user?.user.name}</h1>
        <img src={user?.user.avatar.url} alt="" />
      </div>
      <div className="container">
        <Category>
          <h1>Categories</h1>
          <div className="Category-Container">
            <div className="Category-Container-Income">
              <h2>Income Category </h2>
            </div>

            <div className="Category-Container-Expense">
              <h2>Expense Category</h2>
            </div>
          </div>
        </Category>

        {/* Expenses */}
        <Expenses>
          <h1>Recent Expenses</h1>
          <div className="expense-container">
            <div className="expense d-flex">
              <GiMoneyStack className="icon icon-cash" />
              <div className="details">
                <div className="top d-flex">
                  <p>
                    {" "}
                    <MdDateRange />
                    Date
                  </p>
                  <p>Category</p>
                </div>
                <p> Expense Name</p>
              </div>
              <div className="money">
                <h4>Your Share</h4>
                <h3>
                  <FaRupeeSign /> 1000
                </h3>
              </div>
              <div className="btns">
                <button className="edit">
                  <MdEdit />
                </button>
                <button className="delete">
                  <RiDeleteBinFill />
                </button>
              </div>
            </div>
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
  .heading-name {
    width: 98%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px 20px;
    gap: 20px;
    border-bottom: 1px solid #1f36ce;
    img {
      width: 40px;
    }
  }

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
  .expense {
    width: 100%;
    margin: 20px 0;
    background: #202329;
    border-radius: 10px;
    padding: 5px 10px;
  }
  .icon-cash {
    font-size: 50px;
    color: #00ff00;
  }

  .details {
    .top p {
      font-size: 14px;
      margin: 5px 10px;
      background: #37373790;
      padding: 2px 4px;
    }

    p {
      font-size: 18px;
      margin: 5px 0;
    }
  }

  .money {
    h4 {
      font-size: 14px;
      margin: 5px 0;
    }
    h3 {
      font-size: 14px;
      margin: 10px 0;
      display: flex;
      align-items: center;
    }
  }

  .btns {
    button {
      background: none;
      border: none;
      outline: none;
      font-size: 22px;
      color: #fff;
      margin: 0 5px;
      cursor: pointer;
      transition: scale 0.4s ease;

      &:hover {
        color: yellow;
        transform: scale(1.2);
      }
    }
  }
`;
const Charts = styled.div`
  .Date-Container {
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
