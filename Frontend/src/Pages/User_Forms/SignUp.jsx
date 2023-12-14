import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle, FaUnlock } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { toast } from "react-toastify";
import { RegisterUser } from "../../Store/Actions/UserActions";
import { clearError, clearMessage } from "../../Store/Slices/UserSlice";
import Button from "../../Components/Button";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [cpassword, setCPassword] = useState(undefined);
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [gender, setGender] = useState("");

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  //Set The image
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  //Submit the Form
  const SubmitRegisterForm = (e) => {
    e.preventDefault();

    if ((!email || !name, !mobile, !password, !cpassword, !gender)) {
      return toast.info("Please Fill All Fields");
    }

    if (name.length < 4) return toast.info("Name Must be 4 letters");
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("mobile", mobile);
    formdata.append("password", password);
    formdata.append("gender", gender);
    formdata.append("cpassword", cpassword);
    formdata.append("avatar", avatar);

    dispatch(RegisterUser(formdata));
    formdata.reset();
  };

  useEffect(() => {
    if (isAuthenticated == true) {
      history("/", {
        state: location.pathname,
      });
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, message, isAuthenticated, error]);

  return (
    <Signup>
      {/* Form Container */}
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={SubmitRegisterForm} encType="multipart/form-data">
          <div className="name">
            <span>Name </span>
            <div className="input">
              <FaRegUserCircle className="icon" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Your Name"
              />
            </div>
          </div>
          <div className="email">
            <span> Email</span>
            <div className="input">
              <MdMarkEmailRead className="icon" />
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="Enter Your Email"
              />
            </div>
          </div>

          <div className="mobile">
            <span> Mobile </span>
            <div className="input">
              <IoCall className="icon" />
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                pattern="[0-9]{10}"
                placeholder="Enter Your Email"
                autoComplete="mobile"
              />
            </div>
          </div>

          <div className="gender">
            <span> Gender </span>
            <div className=" gender-input">
              <label htmlFor="male">
                <input
                  onChange={() => setGender("Male")}
                  id="male"
                  type="radio"
                  name="gender"
                />
                <span>Male</span>
              </label>
              <label htmlFor="female">
                <input
                  onChange={() => setGender("Female")}
                  id="female"
                  type="radio"
                  name="gender"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          <div className="password">
            <span> Password </span>

            <div className="input">
              <FaUnlock className="icon" />{" "}
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Your Password"
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="cpassword">
            <span> confirm Password </span>

            <div className="input">
              <FaLock className="icon" />
              <input
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                type="password"
                placeholder="Enter Password Again"
                autoComplete="new-c-password"
              />
            </div>
          </div>
          <div className="input">
            <img
              className="preview-img"
              src={avatarPreview}
              alt="Avatar Preview"
            />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={registerDataChange}
            />
          </div>

          <Button text="SIGN IN" />
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
        cursor: pointer;
        width: 104%;
        z-index: 2;
        border: none;
        margin: 0%;
        font: 800 0.8vmax cursive;
        font-size: 12px;
        transition: all 0.5s;
        padding: 0.1vmax;
        color: rgba(0, 0, 0, 0.623);
        background-color: rgb(255, 255, 255);
      }

      .icon {
        left: 10px;
        font-size: 30px;
        position: absolute;
        width: 20px;
        color: black;
      }

      .preview-img {
        width: 50px;
        border: 2px solid #dadada;
        padding: 2px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }

    .Link {
      font-size: 17px;
      color: blue;
      align-self: flex-end;
    }
  }
  .gender-input {
    display: flex;
    margin: 6px 0;
    gap: 20px;

    input {
      margin-right: 5px;
    }
  }
`;
