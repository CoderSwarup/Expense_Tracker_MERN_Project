import React from "react";
import styled from "styled-components";
import Button from "../StyleComponent/Button";
import { MdOutlineMail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";

export default function Contact() {
  return (
    <Wrapper className="MainContainer">
      <div className="container">
        <div className="top">
          <h1 className="title">Get In Touch</h1>
          <p>Manage Your Hard Earn Money</p>
        </div>
      </div>

      <div className="contact-section">
        <FormContainer>
          <FormTitle>
            Send us a message{" "}
            <div>
              <MdOutlineMail className="icon" />
            </div>
          </FormTitle>
          <form name="contact-form" method="post">
            <FormGrid>
              <div class="input-group">
                <label class="input-group__label" for="myInput">
                  Name
                </label>
                <input type="text" id="myInput" class="input-group__input" />
              </div>
              <div class="input-group">
                <label class="input-group__label" for="myInput">
                  Email Address
                </label>
                <input
                  type="email"
                  id="myInput"
                  class="input-group__input"
                  name="email"
                  required
                />
              </div>
              <div class="input-group">
                <label class="input-group__label" for="myInput">
                  Phone Number
                </label>
                <input
                  type="tel"
                  pattern="[0-10]{10}"
                  id="myInput"
                  class="input-group__input"
                  name="mobile"
                  required
                />
              </div>
              <div class="input-group">
                <label class="input-group__label" for="myInput">
                  Subject
                </label>
                <input
                  type="text"
                  id="myInput"
                  class="input-group__input"
                  name="subject"
                  required
                />
              </div>
            </FormGrid>
            <FormTextArea>
              <div class="input-group">
                <label class="input-group__label" for="myInput">
                  Message
                </label>
                <input
                  type="text"
                  id="myInput"
                  class="input-group__input"
                  name="message"
                  required
                />
              </div>
            </FormTextArea>
          </form>
          <div className="btn">
            <Button text="SUBMIT"></Button>
          </div>
        </FormContainer>

        <ContactInfo>
          <FormTitle>Contact Information</FormTitle>
          <ContactEmail>support@rupeeguardian.in</ContactEmail>
          <div className="icons">
            <a href="https://www.instagram.com/swarup_bhise999/">
              <img src="/assets/icons/instagram.png" alt="instagram" />
            </a>
            <a href="https://wa.link/um4h75">
              <img src="/assets/icons/whatsapp.png" alt="instagram" />
            </a>
            <a href="https://github.com/CoderSwarup">
              <img src="/assets/icons/github.png" alt="instagram" />
            </a>
          </div>
        </ContactInfo>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  .container {
    position: relative;
    height: 500px;
    width: 100%;
    overflow: hidden;
  }

  .top {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 150px;
    transform: translateY(-50%);
    color: #fff;
  }

  .title {
    position: relative;
    font-size: 8rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    padding-bottom: 9px;
    margin-bottom: 10px;
    &::before {
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 4px;
      background: #fff;
    }
  }

  p {
    font-size: 3rem;
  }

  .container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #0000009a, #00000061),
      url("https://img.freepik.com/free-photo/overflowing-coins-within-jar-symbolize-both-savings-financial-education_157027-2441.jpg?t=st=1701105847~exp=1701109447~hmac=d51ada356f78824fcb766d3ddb2c1f01302353d7e56a2e8a61e91d0bd33d2c38&w=1380");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(5px);
    z-index: 0;
  }

  .contact-section {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    gap: 30px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 460 55'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23fff' stroke-width='7' opacity='.1'%3E%3Cpath d='M-345 34.5s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 48.3 0 48.3s115-13.8 115-13.8 57.5-13.8 115-13.8 115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8'/%3E%3Cpath d='M-345 20.7s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 34.5 0 34.5s115-13.8 115-13.8S172.5 6.9 230 6.9s115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8m-920 27.6s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 62.1 0 62.1s115-13.8 115-13.8 57.5-13.8 115-13.8 115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8'/%3E%3Cpath d='M-345 6.9s57.5-13.8 115-13.8S-115 6.9-115 6.9-57.5 20.7 0 20.7 115 6.9 115 6.9 172.5-6.9 230-6.9 345 6.9 345 6.9s57.5 13.8 115 13.8S575 6.9 575 6.9'/%3E%3Cpath d='M-345-6.9s57.5-13.8 115-13.8S-115-6.9-115-6.9-57.5 6.9 0 6.9 115-6.9 115-6.9s57.5-13.8 115-13.8S345-6.9 345-6.9 402.5 6.9 460 6.9 575-6.9 575-6.9m-920 69s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 75.9 0 75.9s115-13.8 115-13.8 57.5-13.8 115-13.8 115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8'/%3E%3C/g%3E%3C/svg%3E%0A"),
      linear-gradient(80deg, #202, #006);
    background-position: 50% 50%;
    animation: background-move 10s linear infinite;
    background-size: 100vw auto, 100% 100%;
    background-size: unquote("max(100vw, 30em)") auto, 100% 100%;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 50px auto;
    width: 80%;
    border-radius: 20px;

    @keyframes background-move {
      0% {
        background-position: 0 0, 0 0;
      }
      100% {
        background-position: 100vw 0, 0 0;
        background-position: unquote("max(100vw, 40em)") 0, 0 0;
      }
    }
  }
`;

//Form Container
const FormContainer = styled.div`
  color: #fff;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  margin: auto;
  width: 100%;

  .input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 2;

    @supports (mix-blend-mode: darken) {
      position: relative;
      mix-blend-mode: lighten;

      &__label {
        position: absolute;
        left: 3em;
        top: -0.28em;
        background: #000;
      }
    }

    &__label {
      padding: 0 0.5em;
      margin-bottom: 0.5em;
      text-transform: uppercase;
      font-size: 0.875em;
      letter-spacing: 0.1em;
      color: #ccd;
      color: rgba(255, 220, 255, 0.6);
      cursor: pointer;
    }

    &__input {
      color: #fff;
      font-size: 1.25rem;
      line-height: 1;
      border-style: none;
      outline: none;
      // height calc line-height + (vertical-padding * 2) + (vertical-border * 2)
      height: calc(1em + 1.6em + 0.5em);
      width: 100%;
      padding: 0.8em 1em;
      border: 0.25em solid transparent;
      background-image: linear-gradient(#000, #000),
        linear-gradient(120deg, #f09 0%, #0ff 50%, #9f0 100%);
      background-origin: border-box;
      background-clip: padding-box, border-box;
      border-radius: 1.8em;
      background-size: 200% 100%;
      transition: background-position 0.8s ease-out;

      &:hover {
        background-position: 100% 0;
      }

      &:focus {
        outline: 2px dashed #ad2b89;
        outline-offset: 0.5em;
      }
    }
  }

  .btn {
    width: 300px;
  }
`;

const FormTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 4rem !important;
  text-align: left;
  margin-bottom: 20px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 27px;
`;

const FormTextArea = styled.div`
  margin: 20px 0;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 50%;

  img {
    width: 50px;
    margin: 0 20px;
  }
`;

const ContactEmail = styled.p`
  font-size: 2rem !important;
  text-align: center;
`;

// Add styles for social media icons...
