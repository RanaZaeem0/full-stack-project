import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.massage);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%"></Logo>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up from new account{" "}
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Alread  have any account
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-900 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-9">
          <div className="">
            <Input
              label="Full name :"
              type="Full name"
              placeholder="Enter your Full name"
              {...register("name", {
                require: true,
              })}
            />
            <Input
              label="email :"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                require: true,
              })}
            />
            <Input
              label="password :"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                require: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
