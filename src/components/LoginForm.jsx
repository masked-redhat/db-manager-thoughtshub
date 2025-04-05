import React from "react";
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

const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center gap-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Admin Account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 w-64">
            <Input type="username" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Button className="cursor-pointer mt-3" type="submit">
              Submit &rarr;
            </Button>
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
