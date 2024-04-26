import React, { useState } from "react";
import loginThumb from "../assets/login/loginThumb.png";
import InputComp from "./inputComp";
import GoogleIcon from "../assets/icons/google.png";
import FaceBookIcon from "../assets/icons/facebook.png";
import axios from "axios";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RegisterComp = () => {
  const [firstName, setFirstName] = useState("Vivek");
  const [lastName, setLastName] = useState("Sahu");
  const [password, setPassword] = useState("testpassword");
  const [confirmPassword, setConfirmPassword] = useState("testpassword");
  const [email, setEmail] = useState("viveksahu1762@gmail.com");
  const [username, setUsername] = useState("vwakesahu");
  const [{ user }, dispatch] = useStateValue();

  const handleSignup = async () => {
    if (
      (email === "" ||
        password === "" ||
        firstName === "" ||
        lastName === "" ||
        username === "" ||
        confirmPassword === "") &&
      confirmPassword === password
    )
      alert(
        "Please Enter All the Fields or confirm password is not matching with password"
      );
    else {
      const payload = {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        username: username,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URI}/api/v1/user/register`,
          payload
        );
        console.log(response);

        // dispatch({
        //   type: actionType.SET_USER,
        //   user: ,
        // });
        // localStorage.setItem("user", JSON.stringify(providerData[0]));
      } catch (error) {
        console.log(error.response);
        if (error?.response?.status) alert("User ALready Exist");
        else {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="p-10 grid grid-cols-6 ">
      <div className="col-span-4 w-full p-6">
        <img src={loginThumb} alt="login thuhbnail" className="w-[90%]" />
      </div>
      <div className="w-full col-span-2 flex flex-col gap-2 h-full justify-center">
        <div className="col-span-1 flex gap-2">
          <input
            placeholder={"First Name"}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="px-4 py-4 rounded-lg w-full border col-span-2"
          />
          <input
            placeholder={"Last Name"}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="px-4 py-4 rounded-lg w-full border col-span-2"
          />
        </div>

        <InputComp
          placeholder={"Enter Email"}
          setValue={setEmail}
          value={email}
        />
        <InputComp
          placeholder={"Enter Username"}
          setValue={setUsername}
          value={username}
        />
        <InputComp
          placeholder={"Enter Password"}
          setValue={setPassword}
          value={password}
        />
        <InputComp
          placeholder={"Confirm Password"}
          setValue={setConfirmPassword}
          value={confirmPassword}
        />

        <button
          className="bg-red-500 p-4 rounded-lg text-white  text-center col-span-2"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="col-span-2 text-center">Or sign up with</p>
        <div className="col-span-2 flex w-full justify-center gap-3">
          <div className="bg-gray-200 p-4 rounded-xl cursor-pointer">
            <img src={GoogleIcon} alt="Google Icon" className="w-10"></img>
          </div>
          <div className="bg-blue-600 p-4 rounded-xl w-[70px] flex items-center justify-center cursor-pointer">
            <img src={FaceBookIcon} alt="Facebook Icon" className=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComp;
