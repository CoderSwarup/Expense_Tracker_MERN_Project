import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <Signup>
      {/* Form Container */}
      <div className="form-container">
        <h2>Register</h2>
        <form action="">
          <div className="name">
            <span>Name </span>
            <div className="input">
              <img src="/assets/icons/sun.png" alt="" />
              <input type="text" placeholder="Enter Your Name" />
            </div>
          </div>
          <div className="email">
            <span> Email</span>
            <div className="input">
              <img src="/assets/icons/sun.png" alt="" />
              <input type="email" placeholder="Enter Your Email" />
            </div>
          </div>

          <div className="mobile">
            <span> Mobile </span>
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
          <div className="cpassword">
            <span> confirm Password </span>

            <div className="input">
              <img src="/assets/icons/sun.png" alt="" />
              <input type="password" placeholder="Enter Password Again" />
            </div>
          </div>
          <div className="input">
            <img src="/assets/icons/sun.png" alt="" />
            <input type="file" name="picture" id="" />
          </div>

          <button>SignIn</button>
        </form>
        <Link to="/login" className="Link">
          Alredy Have Accout?
        </Link>
      </div>
    </Signup>
  );
}

const Signup = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .form-container {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
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

      input::file-selector-button {
        cursor: wait;
        width: 100%;
        z-index: 2;
        border: none;
        margin: 0%;
        font: 400 0.8vmax cursive;
        transition: all 0.5s;
        padding: 0 1vmax;
        color: rgba(0, 0, 0, 0.623);
        background-color: rgb(255, 255, 255);
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
