import React from "react";
import { useParams } from "react-router-dom";

export default function Verify_password() {
  const { token } = useParams();
  console.log(token);
  return (
    <div className="MainContainer">
      <h1>ddd</h1>
    </div>
  );
}
