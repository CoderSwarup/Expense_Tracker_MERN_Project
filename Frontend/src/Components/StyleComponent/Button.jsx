import React from "react";
import styled from "styled-components";

export default function Button({ text }) {
  return (
    <BUTTON>
      <button>{text}</button>
    </BUTTON>
  );
}

const BUTTON = styled.div`
  button {
    margin: 20px 0;
    width: 100%;
    padding: 7px 14px;
    border: none;
    border-radius: 50px;
    background: ${({ theme }) => {
      return theme.color.primaryButton.backgroundColor;
    }};
    font-size: 1.7rem;
    text-transform: uppercase;
    font-weight: bolder;
    color: #fff;
    cursor: pointer;
  }
`;
