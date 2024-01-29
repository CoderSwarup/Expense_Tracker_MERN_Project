import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CiUser } from "react-icons/ci";
import { CgCalendarDates } from "react-icons/cg";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

import { LogoutUser, UpdateAvatar } from "../Store/Actions/UserActions";
import ProfileEditModal from "../Components/PopupModels/ProfileEdit";
import HeatmapChart from "../Components/Charts/HeatmapChart";
import ProfileSetting from "../Components/ProfileDashBoard/ProfileSetting";

export default function Profile() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const [SelectedContainer, setSelectedContainer] = useState("ProfileSetting");
  const joinedDate = new Date(user?.user.createdAt.split("T")[0]);
  const currentDate = new Date();

  const timeDiff = Math.floor(
    (currentDate - joinedDate) / (1000 * 60 * 60 * 24 * 30)
  ); // Assuming a month as the unit

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const RenderData = () => {
    switch (SelectedContainer) {
      case "ProfileSetting":
        return <ProfileSetting openEditModal={openEditModal} />;
      case "Statistics":
        return <HeatmapChart></HeatmapChart>;
      default:
        return <DoughnutChart categories={categoryList} />;
    }

    // Add more conditions for other chart types if needed
  };
  return (
    <>
      {isEditModalOpen && <ProfileEditModal onClose={closeEditModal} />}
      <ProfileWrapper>
        <Setting>
          <div className="heading d-flex">
            <h2>HI {user?.user.name}</h2>

            <div>
              <FaRegBell className="icon" />
              <MdMessage className="icon" />
            </div>
          </div>

          <div className="profile-nav">
            <h2
              onClick={() => setSelectedContainer("ProfileSetting")}
              className={SelectedContainer === "ProfileSetting" ? "active" : ""}
            >
              Profile Setting
            </h2>

            <h2
              onClick={() => setSelectedContainer("Statistics")}
              className={SelectedContainer === "Statistics" ? "active" : ""}
            >
              Statistics
            </h2>
          </div>

          {RenderData()}
        </Setting>
      </ProfileWrapper>
    </>
  );
}

const ProfileWrapper = styled.div`
  @media screen and (max-width: 1300px) {
    .profile {
      display: none;
    }
  }
`;

const Setting = styled.div`
  position: relative;
  margin: auto;
  /* overflow: hidden; */
  padding: 10px 10px;
  display: grid;
  gap: 30px;
  min-height: 100%;
  font-size: 15px;

  .icon {
    font-size: 20px;
  }
  .heading {
    margin: 0 auto;
    width: 90vw;
    display: flex;
    gap: 10px;

    div {
      display: flex;
      gap: 10px;
    }
  }

  .profile-nav {
    display: flex;
    gap: 30px;
    padding-bottom: 10px;
    h2 {
      cursor: pointer;
      border-bottom: 2px solid none;
      padding-bottom: 10px;
    }

    h2.active {
      border-bottom: 2px solid red;
    }
  }

  h4 {
    font-size: 30px;
    font-weight: 200;
    letter-spacing: 2px;
  }
`;
