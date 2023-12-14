import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";

const About = () => {
  return (
    <AboutContainer className="about-container">
      <span className="title">Welcome to Rupee Guardian</span>
      <div className="intro-text">
        <div>
          <p>
            Your ultimate companion in financial management! At Rupee Guardian,
            we understand that managing personal and group finances can be a
            challenging task. That's why we've crafted a comprehensive expense
            tracker that empowers individuals and groups to take control of
            their money with ease.
          </p>
        </div>
        <img src="/assets/About.jpg" alt="" loading="lazy" />
      </div>

      <div className="mission-section">
        <h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1694/1694364.png?ga=GA1.1.241117635.1692078599"
            alt=""
          />
          Our Mission
        </h2>
        <p>
          At Rupee Guardian, our mission is to simplify financial management for
          everyone. We believe that when you have a clear understanding of your
          expenses, you can make informed decisions that lead to financial
          well-being. Whether you're an individual striving to achieve personal
          financial goals or part of a group managing shared expenses, Rupee
          Guardian is here to support you on your journey to financial success.
        </p>
      </div>

      <div className="features-section">
        <h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5303/5303425.png?ga=GA1.1.241117635.1692078599"
            alt=""
          />
          Key Features
        </h2>
        <div className="feature">
          <p>Individual Expense Tracking</p>
          <p>
            Rupee Guardian offers a user-friendly interface for individuals to
            effortlessly track their expenses...
          </p>
        </div>

        <div className="feature">
          <h2>
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/512/7481/7481845.png?ga=GA1.1.241117635.1692078599"
              alt=""
            />
            Group Finance Management
          </h2>
          <p>
            Managing finances in a group has never been simpler. Rupee Guardian
            allows you to create and manage shared wallets...
          </p>
        </div>
      </div>

      <div className="why-choose-section">
        <h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6308/6308114.png?ga=GA1.1.241117635.1692078599"
            alt=""
          />
          Why Choose Rupee Guardian?
        </h2>
        <ul>
          <li>
            User-Friendly Interface: We prioritize simplicity and ease of use...
          </li>
          <li>Security First: Your financial data is important...</li>
          <li>Customizable Categories: Tailor your expense categories...</li>
          <li>Real-time Updates: Stay up-to-date with your finances...</li>
        </ul>
      </div>

      <div className="get-started-section">
        <h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2258/2258188.png?ga=GA1.1.241117635.1692078599"
            alt=""
          />
          Get Started Today!
        </h2>
        <p>
          Join the growing community of Rupee Guardian users who have taken
          charge of their financial well-being...
        </p>
        <div className="cta-buttons">
          {/* <button className="signup-button">Sign Up Now</button>

          <button className="download-button">Download the App</button> */}
          <Button text="Sign Up Now" />
          <Button text="Download the App" />
        </div>
      </div>
    </AboutContainer>
  );
};

export default About;

const AboutContainer = styled.div`
  /* About.css */

  max-width: 80%;
  width: 80%;
  margin: 0 auto;
  padding: 20px;

  .intro-text {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;

    div {
      width: 50%;
      text-align: center;
    }
    img {
      width: 400px;
      border-radius: 20px;
    }
  }

  .mission-section,
  .features-section,
  .why-choose-section,
  .get-started-section {
    margin-top: 30px;

    h2 {
      margin: 20px 0;
      display: flex;
      align-items: center;

      gap: 10px;

      img {
        width: 40px;
      }
    }

    font-size: 15px;
    p {
      padding-left: 20px;
    }
  }

  .title {
    display: block;
    margin: 10px auto;
    width: 500px;
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    line-height: 40px;
    background: linear-gradient(to bottom, #1f36ce, #674492);
    padding: 5px 14px;
    color: #fff;
    border-radius: 50px;
  }

  .feature {
    margin-bottom: 20px;
  }

  ul {
    list-style-type: square;
    padding: 0 0 0 30px;
  }

  li {
    margin-bottom: 10px;
  }

  .cta-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
`;
