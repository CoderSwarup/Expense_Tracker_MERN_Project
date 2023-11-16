import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header({ theme, setTheme }) {
  const [isAuthenticate, setIsAuthenticated] = useState(false);
  const ThemeHandler = () => {
    setTheme((prev) => {
      if (prev === "light") {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      return prev === "light" ? "dark" : "light";
    });
  };

  const [toggleMenu, setToggleMenu] = useState(true);

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <Mainheader>
      <div className="left">
        <div className="logo ">
          <Link className="Link" to="/">
            <img src="./assets/Main_Logo.jpg" alt="" />
          </Link>
          <Link className="Link" to="/">
            <p>Rupee Guardian</p>
          </Link>
        </div>
      </div>
      <div className="right">
        <ul>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
        {isAuthenticate ? (
          <button>Logout</button>
        ) : (
          <>
            <button>
              <Link className="Link" to="/signIn">
                SignIn
              </Link>
            </button>
            <button>
              <Link className="Link" to="/login">
                LogIn
              </Link>
            </button>
          </>
        )}
        <div className="themebutton">
          <div onClick={ThemeHandler}>
            {theme === "light" ? (
              <img src="/assets/icons/moon.png"></img>
            ) : (
              <img className="sun" src="/assets/icons/sun.png"></img>
            )}
          </div>
        </div>
        <div onClick={toggleMenuHandler}>
          <img
            className={theme == "light" ? "menu" : "menu-dark"}
            src="/assets/icons/menu.png"
          ></img>
        </div>
      </div>

      <div className={`ToggleHeader ${toggleMenu === true ? "" : "new"}`}>
        <li className="navlinks">
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/DashBoard">
            DashBoard
          </Link>
          <Link className="link" to="/Analysis">
            Analysis
          </Link>
          <Link className="link" to="/Daily">
            Daily
          </Link>
        </li>
      </div>
    </Mainheader>
  );
}

const Mainheader = styled.div`
  background: ${({ theme }) => theme.color.nav.backgroundColor};
  color: ${({ theme }) => theme.color.nav.color};
  box-shadow: ${({ theme }) => theme.color.nav.boxshadow};
  position: sticky;
  top: 0;
  padding: 15px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
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
        color: #fff;
        text-decoration: none;
      }
    }
  }

  button {
    padding: 5px 10px;
    border-radius: 10px;
    border: none;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: 700;
    background: #fff;
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .themebutton {
      transition: all 0s;

      .sun {
        filter: invert(100%);
      }
    }
    img {
      width: 40px;
      transition: all 0.4s ease;
    }

    .menu-dark {
      filter: invert(100%);
    }
  }

  .ToggleHeader {
    position: absolute;
    top: 80px;
    z-index: -1;
    left: 0;
    width: 100%;

    background: ${({ theme }) => {
      return theme.color.nav.toggleBackground;
    }};
    box-shadow: rgba(157, 157, 157, 0.2) 0px 4px 10px;
    backdrop-filter: blur(16px);
    transform: translate(-100%);
    transition: all 0.7s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;

    .navlinks {
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      gap: 20px;
      justify-content: center;
      width: 200px;

      .link {
        position: relative;
        padding-bottom: 8px;
        font-size: 2rem;
        text-decoration: none;
        color: ${({ theme }) => theme.color.nav.color2};
        font-weight: 800;
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 4px;
          background: purple;
          transition: all 0.2s ease;
        }

        &:hover::before {
          width: 100%;
        }
      }
    }
  }
  .new {
    transform: translate(0);
  }
`;
