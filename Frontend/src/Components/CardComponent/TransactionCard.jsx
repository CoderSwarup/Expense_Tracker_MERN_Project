import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import TransactionEditModal from "../PopupModels/TransactionEditModal";
import TransactionDeleteModal from "../PopupModels/TransactionDeleteModal";

export default function TransactionCard({ incomeexpense }) {
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <Wrapper>
      {show && (
        <TransactionEditModal
          transactionInfo={incomeexpense}
          setShow={setShow}
        ></TransactionEditModal>
      )}
      {showDeleteModal && (
        <TransactionDeleteModal
          transactoninfo={incomeexpense}
          setShowDeleteModal={setShowDeleteModal}
        ></TransactionDeleteModal>
      )}
      <div className="expense d-flex">
        <GiMoneyStack className="icon icon-cash" />
        <div className="details">
          <div className="top d-flex">
            <p>
              <MdDateRange />
              {incomeexpense?.createddate.split("T")[0]}
            </p>
            <p
              style={{
                background: `${
                  incomeexpense.category.type == "Expense" ? "red" : "green"
                }`,
              }}
            >
              {incomeexpense?.category.type}
            </p>
          </div>
          <p> {incomeexpense?.name}</p>
        </div>
        <div className="money">
          <h4>Your Share</h4>
          <h3>
            <FaRupeeSign /> {incomeexpense?.amount}
          </h3>
        </div>
        <div className="btns">
          <button
            onClick={() => {
              setShow(true);
            }}
            className="edit"
          >
            <MdEdit />
          </button>
          <button
            onClick={() => {
              setShowDeleteModal(true);
            }}
            className="delete"
          >
            <RiDeleteBinFill />
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: ${({ theme }) => {
    return theme.color.primaryContainer.text;
  }} !important;
  .expense {
    width: 100%;
    margin: 20px 0;
    background: ${({ theme }) => {
      return theme.color.primaryContainer.Background;
    }};
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

      padding: 2px 4px;
    }

    p {
      font-size: 18px;
      margin: 5px 0;
      display: flex;
      gap: 3px;
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
