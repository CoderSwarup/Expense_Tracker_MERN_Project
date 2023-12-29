import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../Components/StyleComponent/Button";
import { CiUser } from "react-icons/ci";
import { CgCalendarDates } from "react-icons/cg";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { LoginUser } from "../Store/Actions/UserActions";

export default function Profile() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const LogoutHandler = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(LoginUser());
      navigate("/");
    }
  };
  return (
    <ProfileWrapper>
      <ProfileContainer className="profile">
        <div className="top">
          <div className="img-profile">
            <img src={user?.user.avatar.url} alt="profile" />
            <button>Edit Profile</button>
          </div>

          <div className="info">
            <div className="l-info">
              <p className="dark">Last Visit</p>
              <p className="light">3 Months ago</p>
            </div>
            <div className="r-info">
              <p className="dark">Place</p>
              <p className="light">Mumbai</p>
            </div>
          </div>

          <div className="user-info">
            <p>
              {" "}
              <CiUser />
              User Name
            </p>
            <p>
              {" "}
              <CgCalendarDates />
              Joined Date
            </p>
            <p>
              {" "}
              <FaMobileAlt />
              Mobile
            </p>
            <p>
              {" "}
              <MdOutlineMarkEmailRead />
              Email
            </p>
          </div>
        </div>
        <div className="bottom">
          <div className="recent">
            <h2>Recent Activity</h2>
          </div>

          <div onClick={LogoutHandler}>
            <Button text="LogOut ➡️" />
          </div>
        </div>
      </ProfileContainer>

      <Setting>
        <div className="heading d-flex">
          <h2>Rupee Gurdian</h2>

          <div className="right-heading d-flex">
            <FaRegBell className="icon" />
            <MdMessage className="icon" />
            <h2>HI Sam</h2>
          </div>
        </div>

        <h4>Setting</h4>
        <div className="profile-nav">
          <div className="line"></div>
          <h2>Profile Setting</h2>
        </div>

        <div className="main-content">
          <div className="content-top d-flex">
            <li>
              <h3>User Name</h3>
              <p className="text d-flex">
                {user?.user.name} <FiUser />
              </p>
            </li>
            <li>
              <h3>Email</h3>
              <p className="text d-flex">
                {user?.user.email} <MdMarkEmailRead />
              </p>
            </li>
            <li>
              <h3>Language</h3>
              <p className="text d-flex">
                English (USA) <MdLanguage />
              </p>
            </li>
          </div>

          <div className="content-bottom d-flex">
            <div className="content-left ">
              <div className="left-top d-flex">
                <li>
                  <h3>Gender</h3>
                  <p className="select d-flex">
                    <p>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        checked={user?.user.gender === "Male" ? true : false}
                      />{" "}
                      <label htmlFor="male">Male</label>
                    </p>
                    <p>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        checked={user?.user.gender === "Female" ? true : false}
                      />{" "}
                      <label htmlFor="female">FeMale</label>
                    </p>
                  </p>
                </li>
                {/* 
                <li>
                  <h3>BirthDate</h3>
                  <p className="text d-flex">
                    My name is <FaRegCalendarAlt />
                  </p>
                </li> */}
                <li>
                  <h3>Joined Date </h3>
                  <p className="text d-flex">
                    {user?.user.createdAt.split("T")[0]} <FaRegCalendarAlt />
                  </p>
                </li>
              </div>

              <div className="left-bottom d-flex ">
                <button>Deactivate My Account </button>
                <button>Save Changes</button>
              </div>
            </div>

            <div className="content-right">
              <h3>Choose Profile Picture</h3>
              <div className="img-box">
                <img src={user?.user.avatar.url} alt="profile" />
              </div>
              <div className="text d-flex">
                <p> Upload Now</p>
                <p> Delete</p>
              </div>
            </div>
          </div>
        </div>
      </Setting>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  display: flex;
`;

const ProfileContainer = styled.div`
  width: 300px;
  padding: 0 5px;
  height: calc(100vh - 70px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .img-profile {
    width: 100%;
    display: grid;
    place-items: center;
    img {
      margin-top: 20px;
      width: 120px !important;
    }

    button {
      border: none;
      outline: none;
      margin: 5px;
      background: ${({ theme }) => theme.color.success};
      padding: 5px 10px;
      color: ${({ theme }) => theme.color.textColor};
      font-weight: 700;
      border-radius: 10px;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }
  }

  .info {
    display: flex;
    width: 100%;
    margin: 15px 0;
    justify-content: space-around;
    align-items: center;
    .dark {
      font-size: 17px;
    }

    .light {
      font-size: 11px;
    }
  }

  .user-info {
    margin-top: 40px;
    width: 100%;
    text-align: left;
    padding-left: 40px;

    p {
      font-size: 14px;
      display: flex;
      gap: 10px;
      margin: 5px 0;
    }
  }

  .recent {
    position: relative;
    padding: 20px 5px;
    h2 {
      font-size: 20px;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 0.7px;
      width: 100%;
      margin: auto;
      background: ${({ theme }) => theme.color.textColor};
      opacity: 0.3;
    }
  }
`;
const Setting = styled.div`
  display: grid;
  gap: 30px;
  padding: 10px 20px;
  width: calc(100vw - 300px);
  min-height: 100%;
  font-size: 15px;

  .icon {
    font-size: 20px;
  }
  .heading {
    h2:nth-child(1) {
      font-size: 30px;
    }
    width: 100%;

    .right-heading {
      gap: 18px;
    }
  }

  h4 {
    font-size: 30px;
    font-weight: 200;
    letter-spacing: 2px;
  }

  .profile-nav {
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.textColor};
    position: relative;
    justify-content: space-around !important;
    cursor: pointer;

    .line {
      position: absolute;
      content: "";
      width: 150px;
      height: 3px;
      bottom: -0.7px;
      background: blue;
    }
  }

  li {
    list-style: none;
    text-align: left;

    .text {
      position: relative;
      padding: 10px 0;
      font-size: 18px;
      font-weight: 200;
      font-family: "Times New Roman", Times, serif;
      width: 300px;
      border-bottom: 1px solid ${({ theme }) => theme.color.textColor};
    }
  }

  .content-top {
    margin: 10px 0;
  }

  .content-bottom {
    .select {
      position: relative;
      padding: 10px 0;
      gap: 20px;
      font-size: 18px;
      font-weight: 200;
      font-family: "Times New Roman", Times, serif;

      input[type="radio"] {
        margin-right: 5px;
        transform: scale(1.2);
      }
    }
    display: grid;
    align-items: start;
    gap: 20px;
    margin: 40px 0;
    grid-template-columns: 2.5fr 1fr;
    .img-box {
      width: 100%;
      display: grid;
      place-items: center;
      margin: 5px 0;
      img {
        padding: 5px;
        border: 1px solid #dadada;
        margin: 5px 0;
        width: 220px;
      }
    }
    .content-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      margin-right: 100px;
    }

    button {
      padding: 8px 16px;
      border-radius: 20px;
      outline: none;
      border: none;
      background: gray;
      font-size: 17px;
      font-weight: 500;
      color: #fff;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      cursor: pointer;
    }

    button:nth-child(2) {
      background: #007bff;
    }
  }
`;
