import React from "react";
import styled from "styled-components";

export default function Home() {
  return (
    <div className="MainContainer">
      <Hero>
        {/* <div className="light">
          <img src="/assets/light.svg" alt="" />
        </div> */}

        <div className="left-container">
          <h1>
            The <span className="style">Rupee Gurdian</span>{" "}
          </h1>
          <h1> Your Expense Tracker</h1>
          <h1>That Works For </h1>
          <h1>You....</h1>

          <div className="para">
            <p>Track Your all expenses Here Take Remender </p>
            <p>MAnages With Famaly And Friends</p>
            <p>Take Remender </p>
          </div>

          <button>Get Started </button>
        </div>

        <div className="right">
          <img src="/assets/heroimg.png" alt="" />
        </div>
      </Hero>
    </div>
  );
}

const Hero = styled.div`
  min-height: 90vh;
  /* background: red; */
  position: relative;
  padding: 30px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .left-container {
    h1 {
      font-size: 5rem;
      line-height: 70px;
    }

    .style {
      background: linear-gradient(to bottom, #1f36ce, #674492);
      padding: 5px 14px;
      color: #fff;
      border-radius: 50px;
    }

    .para {
      margin: 10px 0;
      p {
        font-size: 14px;
      }
    }
    button {
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
    }
  }
  img {
    width: 450px;
  }
`;
