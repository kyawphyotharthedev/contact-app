import React, { useState } from "react";
import { BsTelephone, BsArrowLeft, BsTrash, BsPencil } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { SlCalender } from "react-icons/sl";
import { RxPerson } from "react-icons/rx";
import { GoLocation, GoNote } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ToastContainer, toast } from "react-toastify";
import { useCreateContactMutation } from "../redux/auth/contactApi";
import Cookies from "js-cookie";

const CreateContact = () => {
  const nav = useNavigate();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [openedImageModal, { open: openImageModal, close: closeImageModal }] =
    useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);

  const handleEdit = () => {
    closeEditModal();
    openImageModal();
    setPhoto("");
  };
  const handleDelete = () => {
    setPhoto(null);
    closeEditModal();
  };
  const token = Cookies.get("token");
  const [createContact] = useCreateContactMutation();
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const newContact = { name, email, phone, address, photo };
      const { data } = await createContact({ token, contact: newContact });
      if (data?.success === true) {
        nav("/");
        toast.success("Contact created successfully", {
          autoClose: 1000,
        });
      } else if (data?.success === false || data === undefined) {
        toast.error("Failed to create.Try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard?")) {
      nav("/");
    }
  };
  return (
    <div className="">
      <div className="max-w-5xl py-4 md:p-5 flex justify-center ">
        <div className="flex flex-col  ">
          <div className=" flex items-center justify-between">
            <button
              onClick={handleDiscard}
              className=" w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200"
            >
              <BsArrowLeft className=" text-lg md:text-2xl hover:text-gray-700" />
            </button>

            <h1 className=" text-gray-800 font-semibold text-lg md:text-2xl ">
              Create Contact
            </h1>
          </div>
          <hr className=" border-b-5 mt-2 border-gray-500" />
          <div className=" mt-10">
            <div className="">
              <form
                action=""
                onSubmit={onSubmitHandler}
                className=" flex flex-col gap-1  items-center   md:gap-3"
              >
                <div className=" md:flex md:gap-48">
                  <div
                    className={`${
                      photo ? "bg-none" : "bg-gray-300"
                    } w-32 h-32 border md:w-40 md:h-40 rounded-[5rem] relative  flex items-center justify-center md:self-start`}
                  >
                    {photo ? (
                      <img
                        src={photo}
                        alt="Contact"
                        className="w-full h-full object-cover rounded-[5rem]"
                      />
                    ) : (
                      <div onClick={openImageModal}>
                        <BiImageAdd className=" text-4xl" />
                      </div>
                    )}
                    <div className={`${photo ? { close } : ""}`}>
                      <Modal
                        opened={openedImageModal}
                        onClose={closeImageModal}
                        title="Upload Image"
                        centered
                        size={250}
                      >
                        <div className=" bg-white rounded-md  ">
                          <div className=" flex flex-col gap-3 ">
                            <input
                              type="text"
                              className=" bg-white/50 border border-gray-500 rounded-md  focus-visible:outline-blue-500 px-2 py-1"
                              value={photo}
                              placeholder="Enter image url"
                              onChange={(e) => setPhoto(e.target.value)}
                            />
                            <button
                              className=" px-4 py-1 text-white rounded-md bg-blue-600"
                              onClick={closeImageModal}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                    <div>
                      <div
                        className={`${
                          photo ? "block" : "hidden"
                        } absolute float-right bottom-2 right-2 `}
                      >
                        <button
                          className="w-8 h-8 flex justify-center items-center bg-white border rounded-[5rem]"
                          onClick={openEditModal}
                        >
                          <BsPencil className=" text-gray-500" />
                        </button>
                      </div>
                      <div className={`${photo ? { close } : ""}`}>
                        <Modal
                          opened={openedEditModal}
                          onClose={closeEditModal}
                          title="Edit"
                          centered
                          size={250}
                        >
                          <div className=" bg-white rounded-md  ">
                            <div className=" flex flex-col gap-3 ">
                              <div
                                className=" flex gap-3 items-center hover:bg-gray-200 p-3"
                                onClick={handleEdit}
                              >
                                <BiImageAdd className=" text-gray-500 text-lg" />
                                <h4>Change picture</h4>
                              </div>
                              <div
                                className=" flex gap-3 items-center hover:bg-gray-200 p-3"
                                onClick={handleDelete}
                              >
                                <BsTrash className="text-gray-500 text-lg" />
                                <h4>Delete picture</h4>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex md:self-end">
                    <button
                      className=" px-6 py-1 bg-sky-500 text-white rounded-md"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
                <div className="flex flex-col  md:gap-1">
                  <label htmlFor="name" className=" text-gray-500">
                    Name
                  </label>
                  <div className="relative">
                    <RxPerson className="  text-gray-500 absolute top-2 left-2" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                      className={` w-[250px] md:w-[500px] xl:w-[600px] px-7 py-1 border border-gray-400 bg-white/30  rounded-md focus-visible:outline-blue-400 `}
                      placeholder="Enter name"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:gap-1">
                  <label htmlFor="email" className=" text-gray-500">
                    Email
                  </label>
                  <div className="relative">
                    <TfiEmail className=" absolute text-gray-500  top-2 left-2" />

                    <input
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-[250px] md:w-[500px] xl:w-[600px] px-7 py-1  border border-gray-400 bg-white/30 rounded-md focus-visible:outline-blue-400 "
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:gap-1">
                  <label htmlFor="phone" className=" text-gray-500">
                    Phone number
                  </label>
                  <div className=" relative ">
                    <BsTelephone className=" absolute text-gray-500 top-2 left-2" />
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-[250px] md:w-[500px] xl:w-[600px] px-7 py-1  border border-gray-400 bg-white/30 rounded-md focus-visible:outline-blue-400 "
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:gap-1">
                  <label htmlFor="address" className=" text-gray-500">
                    Address
                  </label>
                  <div className=" relative ">
                    <GoLocation className=" absolute text-gray-500 top-2 left-2" />

                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-[250px] md:w-[500px] xl:w-[600px] px-7 py-1  border border-gray-400 bg-white/30 rounded-md focus-visible:outline-blue-400 "
                      placeholder="Address"
                    />
                  </div>
                </div>
                <div className="flex self-start mt-3   md:ml-0 md:hidden ">
                  <button
                    className=" px-6 py-1 bg-sky-500 text-white rounded-md"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default CreateContact;
