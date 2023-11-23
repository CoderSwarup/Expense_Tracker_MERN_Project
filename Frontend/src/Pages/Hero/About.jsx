import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";

const About = () => {
  return (
    <AboutContainer className="about-container">
      <h1 className="banner-title">Welcome to Rupee Guardian</h1>
      <p className="intro-text">
        Your ultimate companion in financial management! At Rupee Guardian, we
        understand that managing personal and group finances can be a
        challenging task. That's why we've crafted a comprehensive expense
        tracker that empowers individuals and groups to take control of their
        money with ease.
      </p>

      <div className="mission-section">
        <h2>Our Mission</h2>
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
        <h2>Key Features</h2>
        <div className="feature">
          <h3>Individual Expense Tracking</h3>
          <p>
            Rupee Guardian offers a user-friendly interface for individuals to
            effortlessly track their expenses...
          </p>
        </div>

        <div className="feature">
          <h3>Group Finance Management</h3>
          <p>
            Managing finances in a group has never been simpler. Rupee Guardian
            allows you to create and manage shared wallets...
          </p>
        </div>
      </div>

      <div className="why-choose-section">
        <h2>Why Choose Rupee Guardian?</h2>
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
        <h2>Get Started Today!</h2>
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
  margin: 0 auto;
  padding: 20px;

  .banner-title {
    color: #3498db;
    text-align: center;
  }

  .intro-text {
    text-align: justify;
  }

  .mission-section,
  .features-section,
  .why-choose-section,
  .get-started-section {
    margin-top: 30px;
  }

  h2 {
    color: #3498db;
  }

  .feature {
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  .cta-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .signup-button,
  .download-button {
    background-color: #3498db;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  .signup-button:hover,
  .download-button:hover {
    background-color: #2980b9;
  }
`;
