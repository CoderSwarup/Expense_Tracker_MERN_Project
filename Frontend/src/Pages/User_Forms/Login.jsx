import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Common/Loading";
import { MdMarkEmailRead } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { LoginUser } from "../../Store/Actions/UserActions";
import { clearError } from "../../Store/Slices/UserSlice";
import Button from "../../Components/StyleComponent/Button";
import useToast from "../../Components/Common/ToastContainerComponent";

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const { showToast } = useToast();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (!email && !name) {
        return showToast("Please Fill All Fields", "error");
      }
      dispatch(LoginUser({ email, password }));
    } catch (error) {}
  };

  // If User Is Regiter then Navigate TO dshboard
  useEffect(() => {
    if (isAuthenticated == true) {
      history("/", {
        state: location.pathname,
      });
      showToast("Login successfully ", "success");
    }
    if (error) {
      // toast.error(error);
      showToast(error, "error");
      dispatch(clearError());
    }
  }, [dispatch, isAuthenticated, error]);

  return (
    <LOGIN>
      {/* Form Container */}
      {loading === true ? (
        <Loading></Loading>
      ) : (
        <div className="form-container">
          <h2>LOGIN</h2>
          <form onSubmit={SubmitForm}>
            <div className="email">
              <span> Email</span>
              <div className="input">
                <MdMarkEmailRead className="icon" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter Your Email"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="password">
              <span> Password </span>

              <div className="input">
                <FaUnlockAlt className="icon" />

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter Your Password"
                  autoComplete="current-password"
                />
              </div>
            </div>
            <Link className="p Link" to="/forgot/password">
              Forgot Password?
            </Link>

            <Button text="LOGIN" />
          </form>
          <Link to="/signin" className="Link">
            Don't Have Accout?
          </Link>
        </div>
      )}
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

      .icon {
        left: 10px;
        font-size: 30px;
        position: absolute;
        width: 20px;
        color: black;
      }
    }

    .Link {
      font-size: 17px;
      color: blue;
      align-self: flex-end;
    }
  }
`;
