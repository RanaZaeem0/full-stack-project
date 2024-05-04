import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useFrom } from "react-hook-form";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useFrom();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
    //   register ma data dal kar nikal ga or auth.js ma baj da ga
    
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
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
          Sign in to your account{" "}
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          dont have any account
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link></p>
          {
            error && <p className="text-red-900 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)}
            className="mt-9">
          <div className="">
            <Input  
             label = 'email :'
             type="email"
             placeholder ='Enter your email'
             {...register('email',{
                require:true
             })}
            />
             <Input  
             label = 'password :'
             type="password"
             placeholder ='Enter your password'
             {...register('password',{
                require:true
             })}
            />
                 <Button
                 type='submit'
                 className='w-full'
                 >Sign in</Button>
            </div> 
            </form>
      </div>
    </div>
  );
}
