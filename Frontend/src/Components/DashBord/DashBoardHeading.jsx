import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import CreateTransactionModal from "../PopupModels/CreateTransactionModal";

export default function DashBoardHeading() {
  const { user } = useSelector((state) => state.user);
  const [showTransactionCreationModal, setShowTransactionCreationModal] =
    useState(false);

  return (
    <Wrapper>
      {showTransactionCreationModal && (
        <CreateTransactionModal
          setShowTransactionCreationModal={setShowTransactionCreationModal}
        ></CreateTransactionModal>
      )}
      <div
        onClick={() => {
          setShowTransactionCreationModal(!showTransactionCreationModal);
        }}
        className="create-button"
      >
        <FaCirclePlus />
      </div>

      <div className="heading-name">
        {" "}
        <img src={user?.user.avatar.url} alt="" />
        <div className="centet">
          <h1>Hi , {user?.user.name}</h1>
          <span>See Profile</span>
        </div>
        <div>
          <Link to="/profile">
            <FaAnglesRight className="icon" />
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => {
    return theme.color.textColor;
  }};
  .create-button {
    margin: 0 10px;
    font-size: 38px;
    cursor: pointer;
    transition: all 0.1s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .heading-name {
    width: 250px;
    margin: 6px 9px 2px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    gap: 10px;
    border-radius: 20px;
    border: 1px solid
      ${({ theme }) => {
        return theme.color.primaryContainer.textlight;
      }};

    background: ${({ theme }) => {
      return theme.color.primaryContainer.Background;
    }};
    h1 {
      line-height: 26px;
    }
    img {
      width: 40px;
      cursor: pointer;
    }

    .icon {
      font-size: 20px;
    }
  }
`;
