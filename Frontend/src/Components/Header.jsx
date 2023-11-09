import React from "react";
import styled from "styled-components";

export default function Header({ theme, setTheme }) {
  const ThemeHandler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <Mainheader>
      <h1 onClick={ThemeHandler}>Hwleo</h1>
    </Mainheader>
  );
}

const Mainheader = styled.div`
  background-color: ${({ theme }) => theme.color.primaryButton.backgroundColor};
`;
