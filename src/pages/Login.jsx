import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { SignupForm } from "../components/SignUp";
import { LoginForm } from "../components/LoginForm";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.authenticated) navigate("/");
  }, [user]);

  return (
    <div>
      <Navbar />
      {isSignupClicked ? (
        <SignupForm
          isSignupClicked={isSignupClicked}
          setIsSignupClicked={setIsSignupClicked}
        />
      ) : (
        <LoginForm
          isSignupClicked={isSignupClicked}
          setIsSignupClicked={setIsSignupClicked}
        />
      )}
    </div>
  );
};

export default Login;
