import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router";
import Siderbar from "./Navbar/Sidebar";
import Navbar from "./Navbar/Navbar";

const FormGuard = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  if (token) {
    return (
      <div className=" bg-white dark:bg-[#3f3e3e]">
        <Navbar/>
        <div className=" flex gap-x-20">
          <Siderbar />
          {children}
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
};

export default FormGuard;
