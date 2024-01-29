import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import { MdMarkEmailRead, MdOutlineMarkEmailRead } from "react-icons/md";
import { FaRupeeSign, FaRegCalendarAlt } from "react-icons/fa";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../StyleComponent/Button";
import useToast from "../Common/ToastContainerComponent";
import { UpdateUserProfile } from "../../Store/Actions/UserActions";
const ProfileEditModal = ({ onClose }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const [editedUser, setEditedUser] = useState({
    name: "",
    monthlyBudget: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveChanges = async () => {
    // Add logic to save the changes to the backend
    // console.log("Saving changes:", editedUser);
    if (!editedUser.name || !editedUser.monthlyBudget) {
      return showToast("Please fill all fields", "error");
    }
    if (
      user?.user.name === editedUser.name &&
      user?.user.monthlyBudget === editedUser.monthlyBudget
    ) {
      return showToast("Data Is Not Change", "info");
    }

    await UpdateUserProfile(editedUser, dispatch, onClose);
  };

  useEffect(() => {
    setEditedUser({
      name: user?.user.name,
      monthlyBudget: user?.user.monthlyBudget,
    });
  }, [user]);

  return createPortal(
    <ModalWrapper>
      <ModalContent>
        <h2>Edit Profile</h2>
        <div className="input-group">
          <label>User Name</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input disabled type="email" name="email" value={user?.user.email} />
        </div>
        <div className="input-group">
          <label>Gender</label>
          <span>{user?.user.gender}</span>
        </div>
        <div className="input-group">
          <label>Monthly Budget</label>
          <div className="currency-input">
            <FaRupeeSign />
            <input
              type="number"
              name="monthlyBudget"
              value={editedUser.monthlyBudget}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="button-group">
          <Button text="Save Changes" onClick={handleSaveChanges} />
          <Button text="Cancel" onClick={onClose} />
        </div>
      </ModalContent>
    </ModalWrapper>,
    document.getElementById("popup")
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  color: #000;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  .input-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    label {
      font-size: 17px;
      font-weight: 600;
      margin-bottom: 5px;
      display: block;
    }

    input {
      font-size: 16px;
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    span {
      font-size: 16px;
    }
    .currency-input {
      width: 100%;
      display: flex;
      align-items: center;
      input {
        margin-left: 5px;
      }
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }
`;

export default ProfileEditModal;
