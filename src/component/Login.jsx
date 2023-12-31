import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/auth/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import LogInAnimation from "./Animation/LoginAnimation";
import { addUser } from "../redux/services/userSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, isLoading, error] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const onSignInHandler = async (e) => {
    e.preventDefault();
    try {
      const logInData = { email, password };
      const { data } = await login(logInData);
      dispatch(addUser({ user: data?.user, token: data?.token }));
      toast.success("Sign in successfully", {
        autoClose: 3000,
      });
      if (data?.success === true) {
        nav("/");
      }
    } catch (error) {
      toast.error("Error! Try again");
      console.error(error);
    }
  };

  return (
    <div>
      <div className=" flex justify-center items-center h-screen relative">
        <div className="flex flex-col gap-3 items-center bg-white/40 backdrop-blur-sm rounded-md p-5 w-[350px] sm:w-[400px] md:w-[600px] xl:w-[700px] ">
          <div className="flex items-center">
            <div className="">
              <div className="flex my-3 flex-col items-center">
                <h1 className=" text-3xl text-gray-800 font-semibold">
                  Sign In
                </h1>
                <p className="text-gray-600 font-medium text-center text-lg">
                  Sign in to your account
                </p>
              </div>
              <form
                action=""
                onSubmit={onSignInHandler}
                className=" flex flex-col gap-1 items-center sm:items-baseline  md:gap-2"
              >
                <div className="flex flex-col md:gap-1">
                  <label htmlFor="email" className=" text-gray-500">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[250px] md:w-[280px] xl:w-[300px] px-4 py-1 border border-gray-400 bg-white/30 rounded-md focus-visible:outline-blue-400 "
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="flex flex-col md:gap-1">
                  <label htmlFor="password" className=" text-gray-500">
                    Password
                  </label>
                  <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[250px] md:w-[280px] xl:w-[300px] px-4 py-1 border border-gray-400 bg-white/30 rounded-md focus-visible:outline-blue-400 "
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex mr-5 md:mr-0 mt-2 gap-1">
                  <p className="text-gray-500 mt-1 leading-4 ">
                    If you don't have an account,
                  </p>
                  <Link to={"/register"}>
                    <p className=" text-blue-500  underline underline-offset-3">
                      register
                    </p>
                  </Link>
                </div>
                <div className="flex self-start  md:block md:ml-0 ">
                  <button
                    className=" px-4 py-1 bg-sky-500 text-white rounded-md"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
            <div className="w-[0] md:w-[50%] xl:w-[60%]">
              <LogInAnimation />
            </div>
          </div>
        </div>
        <div className="absolute w-[60%]  md:hidden -z-50">
          <LogInAnimation />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
