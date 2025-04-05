import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-6">
      <h1 className="text-5xl font-semibold">Admin Panel - Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
