import React from "react";
import TableHead from "./TableHead";
import TableData from "./TableData";
import PaginationButton from "../PaginationButton";

const ContactTable = () => {
  return (
    <div className="w-[100%]  flex-col items-center justify-center ">
      <table className=" border-none min-h-screen">
        <TableHead />
        <TableData />
      </table>
      <PaginationButton />
    </div>
  );
};

export default ContactTable;
