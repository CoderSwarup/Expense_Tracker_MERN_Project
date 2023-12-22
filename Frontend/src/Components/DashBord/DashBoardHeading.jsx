import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function DashBoardHeading() {
  const { user } = useSelector((state) => state.user);
  return (
    <Wrapper>
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
  color: ${({ theme }) => {
    return theme.color.textColor;
  }};

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
