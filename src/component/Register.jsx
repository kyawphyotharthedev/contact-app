import React, { useState } from "react";
import RegisterAnimation from "./Animation/RegisterAnimation";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/auth/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [register, isLoading] = useRegisterMutation();
  const nav = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const registerData = { name, email, password, password_confirmation };
      const { data } = await register(registerData);
      if (data?.success === true) {
        toast.success("Your account is registered successfully", {
          autoClose: 1000,
        });
        nav("/login");
      } else {
        toast.error(" Register failed", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hidePasswordHandler = () => {
    const getPassword = document.getElementById("password");
    if (hidePassword) {
      getPassword.type = "password";
    } else {
      getPassword.type = "text";
    }
    setHidePassword(!hidePassword);
  };

  const hideConfirmPasswordHandler = () => {
    const getConfirmPassword = document.getElementById("password_confirmation");
    if (hideConfirmPassword) {
      getConfirmPassword.type = "password";
    } else {
      getConfirmPassword.type = "text";
    }
    setHideConfirmPassword(!hideConfirmPassword);
  };

  return (
    <div>
      <div className=" flex justify-center items-center h-screen relative bg-white/50 ">
        <div className=" bg-white/30 backdrop-blur-sm  rounded-md p-3 md:p-5 flex flex-col items-center gap-1 w-[350px] sm:w-[400px] md:w-[600px] xl:w-[700px] ">
          <div className="flex items-center ">
            <div className="">
              <div className="my-3 flex flex-col items-center ">
                <h1 className=" text-2xl md:text-3xl font-semibold text-gray-800">
                  Register
                </h1>
                <p className=" text-gray-600 font-medium  md:text-lg text-center">
                  Register your account to continue.
                </p>
              </div>
              <form
                action=""
                onSubmit={onSubmitHandler}
                className=" flex flex-col gap-1 items-center sm:items-baseline  md:gap-2"
              >
                <div className="flex flex-col md:gap-1">
                  <label htmlFor="name" className=" text-gray-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className={` w-[250px] md:w-[280px] xl:w-[300px] px-4 py-1 border border-gray-400 bg-white/30  rounded-md focus-visible:outline-blue-400 `}
                    placeholder="Enter your name"
                  />
                </div>
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
                  <div className=" relative ">
                    <input
                      type="text"
                      id="password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-[250px] md:w-[280px] xl:w-[300px] px-4 py-1 border border-gray-400 bg-white/30 rounded-md focus-visible:outline-blue-400 "
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1 px-1 py-1 rounded-md hover:bg-gray-100 "
                      onClick={hidePasswordHandler}
                    >
                      {hidePassword ? (
                        <AiOutlineEye className="" />
                      ) : (
                        <AiOutlineEyeInvisible className="" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col md:gap-1">
                  <label
                    htmlFor="password_confirmation"
                    className=" text-gray-500"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="password_confirmation"
                      value={password_confirmation}
                      onChange={(e) => setPassword_confirmation(e.target.value)}
                      className="w-[250px] md:w-[280px] xl:w-[300px] px-4 py-1 border border-gray-400 bg-white/30 rounded-md focus-visible:outline-blue-400 "
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1 px-1 py-1 rounded-md hover:bg-gray-100 "
                      onClick={hideConfirmPasswordHandler}
                    >
                      {hideConfirmPassword ? (
                        <AiOutlineEye className="" />
                      ) : (
                        <AiOutlineEyeInvisible className="" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex mr-9 md:mr-0 mt-2 gap-1">
                  <p className="text-gray-500 mt-1 leading-4 ">
                    Already have an account?
                  </p>
                  <Link to={"/login"}>
                    <p className=" text-blue-500  underline underline-offset-3">
                      sign in
                    </p>
                  </Link>
                </div>
                <div className="flex self-start  md:block md:ml-0 ">
                  <button
                    className=" px-4 py-1 bg-sky-500 text-white rounded-md"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="w-[0] md:w-[50%] xl:w-[60%]">
              <RegisterAnimation />
            </div>
          </div>
        </div>
        <div className="absolute w-[55%] sm:[w-60%] md:hidden -z-50">
          <RegisterAnimation />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
