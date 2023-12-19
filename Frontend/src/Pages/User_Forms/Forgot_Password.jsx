import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ForgotPassword } from "../../Store/Actions/UserActions";
import Loading from "../../Components/Common/Loading";
import {
  forgotclearError,
  forgotclearMessage,
} from "../../Store/Slices/UserSlice";
export default function Forgot_Password() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.forgotpassword
  );

  const SubmitForm = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please Enter The Email!");
    }
    dispatch(ForgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(forgotclearError());
    }

    if (message) {
      toast.info(message);
      dispatch(forgotclearMessage());
    }
  }, [loading, message, error]);
  return (
    <LOGIN>
      {/* Form Container */}

      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="form-container">
          <h2>Forgot password</h2>
          <form onSubmit={SubmitForm}>
            <div className="email">
              <span> Email</span>
              <div className="input">
                <img src="/assets/icons/sun.png" alt="" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter Your Email"
                />
              </div>
            </div>

            <button>Send Email</button>
          </form>
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
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: 10px 10px 21px #000000ae;
    padding: 10px 30px;

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
      cursor: pointer;
    }
  }
`;
