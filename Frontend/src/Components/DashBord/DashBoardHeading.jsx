import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function DashBoardHeading() {
  const { user } = useSelector((state) => state.user);
  return (
    <Wrapper>
      <div className="heading-name">
        <h1>Hi , {user?.user.name}</h1>
        <img src={user?.user.avatar.url} alt="" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: ${({ theme }) => {
    return theme.color.textColor;
  }};
  .heading-name {
    width: 98%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px 20px;
    gap: 20px;
    border-bottom: 1px solid #1f36ce;
    margin-bottom: 20px;
    img {
      width: 40px;
    }
  }
`;
