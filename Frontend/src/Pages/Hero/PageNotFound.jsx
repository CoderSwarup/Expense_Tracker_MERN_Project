import React from "react";
import styled from "styled-components";

export default function PageNotFound() {
  return (
    <NotFoundPage className="MainContainer">
      <h1>Page Not Found</h1>
    </NotFoundPage>
  );
}

const NotFoundPage = styled.div`
  /* height: 100vh; */
`;
