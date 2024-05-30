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
  console.log(user?.authenticated);

  useEffect(() => {
    if (user?.authenticated) navigate("/");
  }, [user]);

  return (
    <div className="mt-20 md:mt-0">
      {/* <Navbar /> */}
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
