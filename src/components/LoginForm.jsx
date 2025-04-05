import React from "react";
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-48 flex flex-col items-center gap-4"
    >
      <Input type="username" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <Button className="cursor-pointer">Submit &rarr;</Button>
    </form>
  );
};

export default LoginForm;
