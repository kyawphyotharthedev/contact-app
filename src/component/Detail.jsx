import { Badge, Modal, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { BsGlobeAmericas } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useGetSingleContactQuery } from "../redux/auth/contactApi";
import Cookies from "js-cookie";

const Detail = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const token = Cookies.get("token");
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
  const { id } = useParams();
  const { data } = useGetSingleContactQuery({ id, token });
  const user = data?.contact;
  return (
    <div className=" w-[80%] mt-10 rounded-xl shadow-xl mx-auto">
      <div className=" flex  w-[80%] mt-5 justify-between ">
        <div className=" flex p-5  items-center gap-5">
          <div className="" onClick={open}>
            {user?.photo ? (
              <img
                src={user?.photo}
                className="w-32 h-32 rounded-full "
                alt=""
              />
            ) : (
              <p className=" w-32 h-32 text-4xl font-body font-bold rounded-full text-white bg-[#54B435] flex justify-center items-center">
                {user?.name?.charAt(0)}
              </p>
            )}
          </div>
          <Modal
            title={<p className="text-lg font-semibold">Photo</p>}
            opened={opened}
            withCloseButton
            onClose={close}
            transitionProps={{
              transition: "fade",
              duration: 400,
              timingFunction: "linear",
            }}
            radius={"0.7rem"}
          >
            <div className=" flex justify-center items-center">
              {user?.photo ? (
                <img
                  src={user?.photo}
                  className="w-32 h-32 rounded-full "
                  alt=""
                />
              ) : (
                <p className=" w-32 h-32 text-4xl text-white font-body font-bold rounded-full bg-[#54B435] flex justify-center items-center">
                  {user?.name?.charAt(0)}
                </p>
              )}
            </div>
            <div className=" flex justify-center items-center flex-col">
              <p className=" text-lg font-bold font-serif mt-5 my-2">
                {user?.name}
              </p>
              <p>{user?.email}</p>
            </div>
            {/* <Group position="center">
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
          </Group> */}

            {/* {file && (
            <Text size="sm" align="center" mt="sm">
              Picked file: {file.name}
            </Text>
          )} */}
          </Modal>

          <div>
            <div>
              <p className=" my-2 text-3xl text-black dark:text-white font-serif font-semibold">
                {user?.name}
              </p>
              <p className=" mb-2">{user?.email}</p>
              {/* <Badge>{user?.job}</Badge> */}
            </div>
          </div>
        </div>
        <div className=" p-5 ">
          <Link to={`/edit/${user?.id}`}>
            <button className=" px-7 py-1 font-bold font-body rounded bg-[#54B435] text-white ">
              Edit
            </button>
          </Link>
        </div>
      </div>

      <div className=" pl-10  mt-5 flex  gap-5 items-center">
        <div className="p-2 bg-slate-100 shadow-md shadow-cyan-200 rounded-full">
          <Tooltip
            label="Phone"
            className="text-sm"
            color="dark"
            position="bottom"
            withArrow
            arrowSize={6}
            transitionProps={{ transition: "pop", duration: 300 }}
            closeDelay={100}
          >
            <div className="">
              <a href={"tel:" + user?.phone} className="">
                <BsTelephone
                  className={`${
                    user?.phone ? "text-blue-500" : "text-slate-400"
                  } cursor-pointer text-xl`}
                />
              </a>
            </div>
          </Tooltip>
        </div>
        <div className="p-2 bg-slate-100 shadow-md shadow-cyan-200 rounded-full">
          <Tooltip
            label="Location"
            className="text-sm"
            color="dark"
            position="bottom"
            withArrow
            arrowSize={6}
            transitionProps={{ transition: "pop", duration: 300 }}
            closeDelay={100}
          >
            <div className="">
              <a
                href={`https://www.google.com/maps/search/${user?.address}`}
                className=""
              >
                <BsGlobeAmericas
                  className={`${
                    user?.phone ? "text-blue-500" : "text-slate-400"
                  } cursor-pointer text-xl`}
                />
              </a>
            </div>
          </Tooltip>
        </div>
        <div className="p-2 bg-slate-100 shadow-md shadow-cyan-200 rounded-full">
          <Tooltip
            label="Email"
            className="text-sm"
            color="dark"
            position="bottom"
            withArrow
            arrowSize={6}
            transitionProps={{ transition: "pop", duration: 300 }}
            closeDelay={100}
          >
            <div className="">
              <AiOutlineMail
                className={`${
                  user?.email ? "text-blue-500" : "text-slate-400"
                } cursor-pointer text-xl`}
              />
            </div>
          </Tooltip>
        </div>
      </div>
      <hr className=" my-5 w-[80%] ml-8" />

      <div className=" shadow p-5">
        <p className=" text-2xl font-bold text-black/70 dark:text-white">
          {" "}
          Contact Detail
        </p>
        <div className=" flex justify-start  gap-40 mt-10">
          <div className=" flex flex-col gap-5">
            <div>
              <p className="  text-black/70 dark:text-white">Name</p>
              <p className="font-mono font-medium text-lg text-slate-500 dark:text-white/80">
                {user?.name}
              </p>
            </div>
            <div>
              <p className="  text-black/70 dark:text-white">Phone</p>
              <a href={"tel:" + user?.phone} className="text-blue-400">
                {user?.phone}
              </a>
            </div>
            <div>
              <p className="  text-black/70 dark:text-white">Email</p>
              <p className="flex items-center">
                <Link
                  to={`https://mail.google.com/mail/u/?authuser=${user?.email}`}
                  className="text-blue-400"
                >
                  {user?.email}
                </Link>
              </p>
            </div>
            <div>
              <p className="  text-black/70 dark:text-white">Job</p>
              <p className=" font-mono font-medium text-lg text-slate-500 dark:text-white/80">
                {user?.job}
              </p>
            </div>
          </div>
          <div className=" flex flex-col gap-5">
            <div>
              <p className="  text-black/70 dark:text-white">Address</p>
              <p className=" font-mono font-medium text-lg text-slate-500 dark:text-white/80">
                {user?.address}
              </p>
            </div>
            <div>
              <p className="  text-black/70 dark:text-white">Birthday</p>
              <p className=" font-mono font-medium text-lg text-slate-500 dark:text-white/80">
                {user?.birthday}
              </p>
            </div>
            <div>
              <p className="  text-black/70 dark:text-white">Note</p>
              <p className=" font-mono font-medium text-lg text-slate-500 dark:text-white/80">
                {user?.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
