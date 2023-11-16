import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <LOGIN>
      {/* Form Container */}
      <div className="form-container">
        <h2>LOGIN</h2>
        <form action="">
          <div className="email">
            <span> Email</span>
            <div className="input">
              <img src="/assets/icons/sun.png" alt="" />
              <input type="email" placeholder="Enter Your Email" />
            </div>
          </div>

          <div className="password">
            <span> Password </span>

            <div className="input">
              <img src="/assets/icons/sun.png" alt="" />
              <input type="password" placeholder="Enter Your Password" />
            </div>
          </div>
          <Link className="p Link" to="/forgot/password">
            Forgot Password?
          </Link>

          <button>LogIn</button>
        </form>
        <Link to="/signin" className="Link">
          Don't Have Accout?
        </Link>
      </div>
    </LOGIN>
  );
}

const LOGIN = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .form-container {
    width: 300px;
    height: 500px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: 10px 10px 21px #000000ae;
    padding: 10px;
    margin: 30px 0;
    h2 {
      text-transform: uppercase;
      font-size: 70px;
      font-weight: 600;
      color: #102cff9e;
      font-family: "CustomFont";
    }
    .p {
      margin: 10px !important;
      text-align: right !important;
      color: black !important;
      font-size: 13px !important;
    }
    form {
      padding: 10px 20px;
      margin: 20px 0;
    }

    span {
      font-weight: 500;
      font-size: 17px;
      text-transform: capitalize;
      color: #000000a8;
    }

    form .input {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 5px 0;

      input {
        width: 100%;
        padding: 10px 10px;
        border: none;
        padding-left: 40px;
        border: 1px solid #00000061;
      }

      img {
        left: 10px;

        position: absolute;
        width: 20px;
      }
    }

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
      cursor: wait;
    }

    .Link {
      font-size: 17px;
      color: blue;
      align-self: flex-end;
    }
  }
`;
