import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-6">
      <h1 className="text-4xl font-semibold flex flex-col gap-0.5 text-center">
            <span>ThoughtsHub</span>
            <span className="text-xl font-light tracking-wider text-gray-600">Admin Panel</span>

      </h1>
      <LoginForm />
    </div>
  );
};

export default Login;
