import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom"; 

const Signin = () => {
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user_email, user_password);

    // Basic validation
    if (!user_email || !user_password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        user_email,
        user_password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/posts");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        toast.error("Invalid email or password.");
      } else {
        toast.error("There was an error logging in. Please try again.");
      }
    }
  };

  return (
    <div className="p-16  text-gray-200 min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={user_email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={user_password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
