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
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")

  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [user_mobileNo, setNumber] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_name = firstName +" "+lastName
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup", {
        user_name,
        user_email,
        user_password,
        user_mobileNo,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/editprofile");
      // window.location.reload();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(error.response.data.msg);
        } else if (error.response.status === 422) {
          toast.error(error.response.data.msg);
        }
      } else {
        toast.error("Network error");
      }
    }
  };

  return (
    <div className="p-16  text-gray-200 min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input 
                  id="first-name" 
                  placeholder="Max" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input 
                  id="last-name" 
                  placeholder="Robinson" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required 
                />
              </div>
            </div>
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
                value={user_password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobileNo">Mobile Number</Label>
              <Input 
                id="mobileNo" 
                type="number" 
                placeholder="1234567890" 
                value={user_mobileNo}
                onChange={(e) => setNumber(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
