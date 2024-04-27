import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import React, { useEffect } from "react";

const UserProtectedRoutes = ({ chidren }) => {
  const [{ user }] = useStateValue();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return <div>{chidren}</div>;
};

export default UserProtectedRoutes;
