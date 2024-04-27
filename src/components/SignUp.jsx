import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useStateValue } from "../context/StateProvider";
import GoogleIcon from "../assets/icons/google.png";
import FaceBookIcon from "../assets/icons/facebook.png";
import axios from "axios";
import { actionType } from "../context/reducer";
import loginThumb from "../assets/login/loginThumb.png";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function SignupForm({ setIsSignupClicked }) {
  const [firstName, setFirstName] = useState("Vivek");
  const [lastName, setLastName] = useState("Sahu");
  const [password, setPassword] = useState("testpassword");
  // const [confirmPassword, setConfirmPassword] = useState("testpassword");
  const [email, setEmail] = useState("viveksahu1762@gmail.com");
  const [username, setUsername] = useState("vwakesahu");
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      username === ""
    )
      toast("Please Enter All the Fields!!");
    else {
      const payload = {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        username: username,
      };

      try {
        const response = await axios.post("/user/register", payload);
        // console.log(response);
        if (response.data.status === 200) {
          toast("User Register Successfully!!");
          const reduxObj = {
            ...response.data.payload.user,
            ...response.data.payload.token,
            authenticated: true,
          };
          dispatch({
            type: actionType.SET_USER,
            user: reduxObj,
          });
          localStorage.setItem("user", JSON.stringify(reduxObj));
          navigate("/");
        }

        // localStorage.setItem("user", JSON.stringify(providerData[0]));

        //   {
        //     "data": {
        //         "status": 200,
        //         "payload": {
        //             "user": {
        //                 "_id": "662c8d3fca43ea1ee01fd0dd",
        //                 "username": "vwakesahu",
        //                 "email": "viveksahu1762@gmail.com",
        //                 "__v": 0
        //             },
        //             "token": {
        //                 "RefreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJjOGQzZmNhNDNlYTFlZTAxZmQwZGQiLCJpYXQiOjE3MTQxOTU3NzUsImV4cCI6MTcxNTA1OTc3NX0.uT-49pIg-eLW5fgjYOumVkag5Stv0JL4bzFgMJOcMdg",
        //                 "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJjOGQzZmNhNDNlYTFlZTAxZmQwZGQiLCJlbWFpbCI6InZpdmVrc2FodTE3NjJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ2d2FrZXNhaHUiLCJpYXQiOjE3MTQxOTU3NzUsImV4cCI6MTcxNDI4MjE3NX0.3fsDiqu7enihbacZrzhjzUUt_p8f3e4M3EOl2iVc2vc"
        //             }
        //         },
        //         "message": "user register successfully",
        //         "issuccess": true
        //     },
        //     "status": 201,

        // }
      } catch (error) {
        console.log(error.response);
        if (error?.response?.status) toast("User ALready Exist!!");
        else {
          console.log(error);
        }
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="Vivek"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="Sahu"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="vwakesahu"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleSignup}>
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <p
            href="#"
            className="underline cursor-pointer"
            onClick={() => setIsSignupClicked(false)}
          >
            Sign in
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
