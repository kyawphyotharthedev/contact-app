import React from "react";

const TableHead = () => {
  return (
    <>
      <thead>
        <tr>
          <th className=" mr-5     text-black dark:text-white  text-left py-5 font-mono  px-5 uppercase"></th>
          <th className=" mr-5     text-black dark:text-white  text-left py-5 font-mono  px-5 uppercase">
            Name
          </th>
          <th className=" mr-5     text-black dark:text-white  px-5  text-left py-5 font-mono uppercase">
            Email
          </th>
          <th className=" mr-5     text-black dark:text-white  px-1  text-left py-5 font-mono uppercase">
            Phone Number
          </th>
          <th className=" mr-5     text-black dark:text-white  px-5  text-left py-5 font-mono uppercase">
            Location
          </th>
          <th className=" mr-5     text-black dark:text-white  px-5  text-left py-5 font-mono uppercase">
            Job
          </th>
          <th className=" mr-5     text-black dark:text-white  px-5  text-left py-5 font-mono uppercase">
            Actions
          </th>
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
