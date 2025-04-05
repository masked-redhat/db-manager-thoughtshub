import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useDisabled } from "../providers/DIsableProvider";
import { loginAdminUrl } from "../../constants/server";
import { post } from "../../utils/request";
import { useToken } from "../providers/AdminTokenProvider";
import Cookies from "js-cookie";

const LoginForm = () => {
  const { disabled, setDisabled } = useDisabled();
  const { setToken } = useToken();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setDisabled(true);

    const body = { username, password };
    try {
      const response = await post(loginAdminUrl, body);

      const result = await response.json();

      if (response.ok) {
        console.log("Login Successful");
        Cookies.set("auth_token", result.auth_token);
        setToken(result.auth_token);
      } else console.log("Error occured, Returned response: ", result);
    } catch (err) {
      console.log("Error occured : ", err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Admin Account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 w-64">
            <Input
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-2"
              autoComplete="new-password"
              required
            />
            {disabled ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="cursor-pointer" type="submit">
                Submit &rarr;
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p>&copy; Masked Redhat 2025</p>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;
