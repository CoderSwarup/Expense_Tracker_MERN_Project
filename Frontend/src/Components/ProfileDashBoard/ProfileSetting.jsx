import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

import Button from "../StyleComponent/Button";
import styled from "styled-components";
import { UpdateAvatar } from "../../Store/Actions/UserActions";
export default function ProfileSetting({ openEditModal }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setSelectedImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleDeleteImage = () => {
    // Handle logic to delete the image
    setImagePreview(null);
  };

  const handleSaveImage = () => {
    UpdateAvatar({ avatar: selectedImage }, dispatch, setIsLoading);
  };
  const LogoutHandler = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(LogoutUser());
      navigate("/");
    }
  };

  return (
    <Wrapper>
      <div className="main-content">
        <div className="content-top ">
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
                <div className="select d-flex">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    defaultChecked={user?.user.gender === "Male"}
                  />{" "}
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    defaultChecked={user?.user.gender === "Female"}
                  />{" "}
                  <label htmlFor="female">FeMale</label>
                </div>
              </li>

              <li>
                <h3>Joined Date </h3>
                <p className="text d-flex">
                  {user?.user.createdAt.split("T")[0]} <FaRegCalendarAlt />
                </p>
              </li>
            </div>

            <div className="left-center d-flex">
              <li>
                <h3>Monthly Budget</h3>
                <p
                  style={{
                    fontSize: "18px",
                    display: "flex",
                    gap: "10px",
                    margin: "5px 0",
                  }}
                >
                  <FaRupeeSign /> {user?.user?.monthlyBudget}
                </p>
              </li>
              {/* 
        <li>
          <h3>BirthDate</h3>
          <p className="text d-flex">
            My name is <FaRegCalendarAlt />
          </p>
        </li> */}
            </div>

            <div className="left-bottom d-flex ">
              <button>Deactivate My Account </button>
              <button onClick={openEditModal}>Edit </button>
            </div>
          </div>

          <div className="content-right">
            <h3>Choose Profile Picture</h3>
            {isLoading ? (
              <h3
                style={{
                  height: "170px",
                }}
                className="img-box"
              >
                Uploading...
              </h3>
            ) : (
              <>
                <div className="img-box">
                  {ImagePreview ? (
                    <img src={ImagePreview} alt="profile" />
                  ) : (
                    <img src={user?.user.avatar.url} alt="profile" />
                  )}
                </div>
                <TextContainer className="text ">
                  {ImagePreview ? (
                    <>
                      <label onClick={handleSaveImage}>Save</label>
                      <label onClick={handleDeleteImage}>Delete</label>
                    </>
                  ) : (
                    <>
                      <label htmlFor="upload">Upload Now</label>
                      <input
                        type="file"
                        id="upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </>
                  )}
                </TextContainer>
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{ width: "300px" }} onClick={LogoutHandler}>
        <Button text="LogOut ➡️" />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  li {
    list-style: none;
    text-align: left;

    .text {
      position: relative;
      padding: 10px 0;
      font-size: 18px;
      font-weight: 200;
      font-family: "Times New Roman", Times, serif;
      width: 260px;
      border-bottom: 1px solid ${({ theme }) => theme.color.textColor};
    }
  }

  .content-top {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
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
      width: 100%;
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

    .left-bottom {
      gap: 10px;
    }
  }

  @media screen and (max-width: 1300px) {
    width: 100vw;
    padding: 0;
    margin: 0;
  }

  @media screen and (max-width: 980px) {
    .content-top {
      justify-content: space-around;
    }
    li {
      margin: 10px 0;
    }
    .content-bottom {
      grid-template-columns: 2fr 1fr;
      .left-top {
        flex-wrap: wrap;
      }
    }

    .left-bottom {
      width: 100%;
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: 750px) {
    .main-content {
      width: 100%;
    }

    li {
      margin: 10px 0;
    }
    .content-bottom {
      margin: 0 auto;
      gap: 20px;
      width: 96vw;
      display: grid;
      grid-template-columns: 1fr;
      .left-top {
        width: 94vw;
        justify-content: space-between;
        align-items: center;
      }
    }

    .left-bottom {
      width: 90vw;
      flex-wrap: wrap;
    }

    .content-right {
      width: 400px;
    }
  }
  @media screen and (max-width: 590px) {
    li {
      width: 90vw;

      .text {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 440px) {
    .content-right {
      width: 90vw;
      h3 {
        font-size: 13 px;
      }

      .img-box {
        img {
          width: 170px;
        }
      }
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  p {
    margin: 0;
    font-size: 16px;
  }

  label {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
  }

  input {
    display: none;
  }

  .delete-icon {
    color: #ff5050;
    font-size: 20px;
  }
`;
