import Link, { useNavigate } from "react-router-dom";

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
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export function LoginForm({ setIsSignupClicked }) {
  const [{ user }, dispatch] = useStateValue();
  // console.log(user)
  const [email, setEmail] = useState("viveksahu1762@gmail.com");
  const [password, setPassword] = useState("testpassword");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "" || password === "") toast("Please Enter All the Fields!!");
    else {
      const payload = {
        email: email,
        password: password,
      };

      try {
        const response = await axios.post("/api/v1/user/login", payload);
        // console.log(response);
        if (response.data.status === 200) {
          toast("User Logged in Successfully!!");
          dispatch({
            type: actionType.SET_USER,
            user: {
              ...response.data.payload.user,
              ...response.data.payload.token,
              authenticated: true,
            },
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...response.data.payload.user,
              ...response.data.payload.token,
              authenticated: true,
            })
          );
          navigate("/");
        }
      } catch (error) {
        console.log(error.response);
        if (error?.response?.status) alert("Login failed!!");
        else {
          console.log(error);
        }
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <p className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </p>
            </div>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <p
            className="underline cursor-pointer"
            onClick={() => setIsSignupClicked(true)}
          >
            Sign up
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
