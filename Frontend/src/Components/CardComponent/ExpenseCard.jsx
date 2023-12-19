import React from "react";
import styled from "styled-components";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
export default function ExpenseCard() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: #fff !important;
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
