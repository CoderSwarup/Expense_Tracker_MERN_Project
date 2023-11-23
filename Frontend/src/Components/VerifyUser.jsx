import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdVerified } from "react-icons/md";
import Button from "./Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function VerifyUser() {
  const { token } = useParams();
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigator = useNavigate();
  const verifyUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`/api/v1/auth/verify/user/${token}`);

      if (response.data.success) {
        setVerification(true);
        toast.success(response.data.message);
        Navigator("/login");
        // You can redirect the user to a login page or dashboard after successful verification
      }
      setLoading(false);
    } catch (error) {
      setVerification(false);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Verify className="MainContainer">
      {loading && <Loading></Loading>}
      <div className="heading">
        <MdVerified className="icon" />
        <h1>Verify Your Account </h1>
      </div>
      <div className="container">
        <div className="left">
          <img src="/assets/verify.jpg" alt="verify" />
        </div>
        <div className="right">
          <p>
            {verification === true && (
              <>
                Thank you for verifying your account. You can now log in to
                access the Rupee Guardian app and start managing your expenses.
                If you have any questions or need assistance, feel free to
                contact our support team.
              </>
            )}

            {verification === false && (
              <>
                Something went wrong during the verification process. Please
                check your verification link and ensure it is valid. If the
                issue persists, contact our support team for further assistance.
              </>
            )}
          </p>

          {verification === null && (
            <>
              <p>
                Welcome to Rupee Guardian, your trusted companion in financial
                management! We understand the importance of tracking your
                expenses and staying on top of your financial goals. Whether
                you're budgeting, saving, or planning for the future, Rupee
                Guardian is here to help simplify your financial journey. Please
                Verify Your Accout To Manage Your Expense In Our Platform...
              </p>
              <div className="btn" onClick={verifyUser}>
                <Button text="VERIFY" />
              </div>
            </>
          )}
        </div>
      </div>
    </Verify>
  );
}

const Verify = styled.div`
  width: 100%;
  height: 100vh;

  padding: 20px;

  .heading {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .icon {
    font-size: 30px;
    color: #46ff46;
  }
  h1 {
    font-size: 30px;
    text-transform: uppercase;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;

    div {
      width: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    img {
      width: 400px;
      border: 2px solid #dadada;
      border-radius: 25px;
      padding: 10px;
    }
    p {
      font-size: 20px;
    }
  }

  .btn {
    justify-self: right;
    width: 300px !important;
  }
`;
