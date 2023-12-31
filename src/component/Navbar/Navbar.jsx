import React from "react";
import { FcFeedback } from "react-icons/fc";
import { Input } from "@mantine/core";
import { BsSearch } from "react-icons/bs";
import Toggle from "./Toggle";
import { Avatar } from "@mantine/core";
import { useContextCustom } from "../../context/DarkContext";
import { FiPower } from "react-icons/fi";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/auth/authApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { removeUser } from "../../redux/services/userSlice";

const Navbar = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const nav = useNavigate();
  const logOutHandler = async () => {
    const { data } = await logout(token);
    if (data?.success) {
      dispatch(removeUser());
      nav("/login");
    }
  };
  const { darkTheme, lightSwitch } = useContextCustom();
  return (
    <div className=" bg-white dark:bg-[#3a3838] shadow-lg">
      <div className=" flex dark:text-white items-center justify-between container mx-auto px-5">
        <div className=" w-3/12 py-2 ">
          <Input icon={<BsSearch />} placeholder="Your email" size="sm" />
        </div>
        <div className="w-2/12 flex gap-3 justify-center items-center">
          <FcFeedback className=" text-4xl  " />
          <h2 className=" text-2xl font-bold font-body text-[#57d92c]">
            Connect
          </h2>
        </div>
        <div className="w-3/12 justify-end flex gap-4 items-center">
          <Menu>
            <MenuHandler>
              <Avatar size="md" color="green" radius="lg">
                {user?.name?.charAt(0)}
              </Avatar>
            </MenuHandler>
            <MenuList>
              <MenuItem
                tabIndex={1}
                className="flex items-center gap-2 border-none"
              >
                <CgProfile className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  My Profile
                </Typography>
              </MenuItem>
              <hr className="my-2 border-blue-gray-50" />
              <MenuItem
                onClick={logOutHandler}
                tabIndex={1}
                className="flex items-center gap-2 border-none "
              >
                <FiPower className="h-4 w-4 text-red-500" />
                <Typography variant="small" className="font-normal ">
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>

          <Toggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
