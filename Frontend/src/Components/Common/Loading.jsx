import React from "react";
import styled from "styled-components";

export default function Loading() {
  return (
    <Loader>
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Loader>
  );
}

const Loader = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  z-index: 999;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;

  //Loading Animaion
  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 5em;
  }

  span {
    width: 0.9em;
    height: 2.7em;
    background-color: #3cefff;
  }

  span:nth-of-type(1) {
    animation: grow 1s -0.45s ease-in-out infinite;
  }

  span:nth-of-type(2) {
    animation: grow 1s -0.3s ease-in-out infinite;
  }

  span:nth-of-type(3) {
    animation: grow 1s -0.15s ease-in-out infinite;
  }

  span:nth-of-type(4) {
    animation: grow 1s ease-in-out infinite;
  }

  @keyframes grow {
    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(2);
    }
  }
`;
