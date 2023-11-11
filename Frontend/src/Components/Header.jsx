import React from "react";
import styled from "styled-components";

export default function Header({ theme, setTheme }) {
  const ThemeHandler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <Mainheader>
      <div className="left">
        <div className="logo">
          <img src="./assets/Main_Logo.jpg" alt="" />
          <p>Rupee Guardian</p>
        </div>

        <div className="pages">
          <ul>Categories</ul>
        </div>
      </div>
      <div className="right">
        <ul>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>

        <button>Logout</button>
        <button>SignIn</button>
        <button>LogIn</button>
        <div className="theme">
          <button onClick={ThemeHandler}>change</button>
        </div>
      </div>
    </Mainheader>
  );
}

const Mainheader = styled.div`
  background-color: ${({ theme }) => theme.color.nav.backgroundColor};
  color: ${({ theme }) => theme.color.nav.color};
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    gap: 20px;
    font-size: 16px;
    font-weight: 600;
  }

  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    .logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      img {
        width: 50px;
        border-radius: 100%;
      }

      p {
        font-size: 40px;
        letter-spacing: 2px;
        font-family: "CustomFont", sans-serif;
      }
    }
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    button {
      padding: 5px 10px;
      border-radius: 10px;
      border: none;
      text-transform: capitalize;
      font-size: 14px;
      font-weight: 700;
      background: white;
    }
    .theme {
      transition: all 0s;
    }
  }
`;
