import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <div className="footer-body-1">
        <span>Rupee Guardian</span>
        <p> 💹 Track Your Daily Expenses</p>
        <p> 💸 Your Finance Manager</p>
      </div>
      <div className="footer-body-2">
        <span>Contact Us</span>
        <div className="contact-container">
          <div>G</div>
          <div>I</div>
          <div>L</div>
          <div>W</div>
          <div>
            <img src="/assets/profile.png" alt="" />
          </div>
        </div>
      </div>
      <div className="footer-body-3">
        <ul>
          <li>Categories</li>
          <li>Analetic</li>
          <li>Profile</li>
        </ul>
      </div>
      <div className="footer-body-4">
        <p>DOWLOAD APP</p>
        <p>Play Store</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.footer.backgroundColor};
  color: ${({ theme }) => theme.color.footer.color};
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;

  .footer-body-1 {
    span {
      font-size: 80px;
      letter-spacing: 2px;
      font-family: "CustomFont", sans-serif;
    }

    p {
      font-size: 20px;
      letter-spacing: 0.6px;
    }
  }
  .footer-body-2 {
    span {
      font-size: 40px;
      letter-spacing: 0.8px;
      font-weight: 800;
      font-family: "Courier New", Courier, monospace;
    }

    .contact-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 20px;

      div {
        font-size: 80px;
        font-family: "CustomFont";
        img {
          width: 80px;
          border-radius: 100%;
        }
      }
    }
  }

  .footer-body-3 {
    li {
      position: relative;
      list-style: none;
      font-size: 20px;
      margin: 10px 0;
      padding: 10px 0;
      width: 200px;

      &::before {
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        height: 2px;
        width: 80%;
        background: #fff;
      }
    }
  }

  .footer-body-4 {
    p {
      font-size: 30px;
      font-weight: bolder;
      text-transform: uppercase;
      font-family: "Times New Roman", Times, serif;
    }
  }
`;
