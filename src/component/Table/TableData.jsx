import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import "./table.css";
import { Badge, Menu, Tooltip } from "@mantine/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useDeleteContactMutation } from "../../redux/auth/contactApi";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const TableData = () => {
  const token = Cookies.get("token");
  const [deleteContact] = useDeleteContactMutation();

  const deleteHandler = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
      const data = await deleteContact({ id: id, token });
    });
  };
  const { userData } = useSelector((state) => state?.userData);
  const tr = userData?.map((data) => (
    <tr
      key={data?.id}
      className=" shadow dark:shadow-[#58595a]   hover:bg-[#e0b5ad31] user cursor-pointer"
    >
      <td className="px-3 text-left  dark:text-white font-mono">
        <div className=" w-10  rounded-full">
          {data?.img ? (
            <img src={data?.img} className=" w-full rounded-full" />
          ) : (
            <div className=" flex justify-center items-center w-10 h-10 rounded-full bg-[#54B435]">
              <p className=" text-white"> {data?.name?.charAt(0)}</p>
            </div>
          )}
        </div>
      </td>
      <td className="px-3 text-left  dark:text-white font-mono">
        <div className=" py-5">
          <p className=" ">{data?.name}</p>
        </div>
      </td>
      <td className="px-3 text-left  dark:text-white font-mono">
        {data?.email ? (
          <div className=" py-5">
            <p>{data?.email}</p>
          </div>
        ) : (
          <div></div>
        )}
      </td>
      <td className="px-3 text-center  dark:text-white font-mono">
        <div className=" py-5">
          <p>{data?.phone}</p>
        </div>
      </td>
      <td className="px-3 text-left  dark:text-white font-mono">
        <div>
          <p className=" first-letter:uppercase">{data?.address}</p>
        </div>
      </td>
      <td className="px-3 text-left  dark:text-white font-mono">
        {data?.job ? (
          <div className=" w-[94px] ">
            <p className=" text-center text-gray-400 text-sm "> Job</p>

            <Badge>
              <p className=" first-letter:uppercase text-center">{data?.job}</p>
            </Badge>
          </div>
        ) : (
          <div></div>
        )}
      </td>
      <td className="px-3 text-left  dark:text-white font-mono">
        <div className=" action flex justify-center items-center gap-3">
          <Tooltip
            label="Detail"
            position="bottom"
            transitionProps={{ transition: "pop", duration: 300 }}
          >
            <div className="">
              <Link to={`/detail/${data?.id}`}>
                <button>
                  <TbListDetails />
                </button>
              </Link>
            </div>
          </Tooltip>
          <>
            <Menu
              openDelay={50}
              closeDelay={200}
              trigger="hover"
              transitionProps={{ transition: "scale", duration: 500 }}
            >
              <Menu.Target>
                <button>
                  <BsThreeDotsVertical />
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => deleteHandler(data?.id)}
                  color="red"
                  icon={<MdOutlineDelete size={20} />}
                >
                  <div className="">
                    <button className="pr-10">Delete</button>
                  </div>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <tbody>{tr}</tbody>
    </>
  );
};

export default TableData;
