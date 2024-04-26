import React from "react";
import axios from "axios";

const Dummy = () => {
  const login = async () => {
    const { data } = await axios.get("http://localhost:9000/auth/google");
    window.location.href = data;
  };
  return (
    <div>
      <button onClick={login}>login</button>
    </div>
  );
};

export default Dummy;
