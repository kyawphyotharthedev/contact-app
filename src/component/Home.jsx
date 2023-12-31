import React from "react";
import Navbar from "./Navbar/Navbar";
import Siderbar from "./Navbar/Sidebar";
import ContactTable from "./Table/ContactTable";
import PaginationButton from "./PaginationButton";
const Home = () => {
  return (
    <div className=" bg-white dark:bg-[#3f3e3e]">
      <Navbar/>
      <div className=" flex">
        <Siderbar />
        <ContactTable />
      </div>
    </div>
  );
};

export default Home;
