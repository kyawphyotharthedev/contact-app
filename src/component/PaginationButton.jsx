import React, { useEffect, useState } from "react";
import { useGetContactUserQuery } from "../redux/auth/contactApi";
import Cookies from "js-cookie";
import { Text, Pagination } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { addUser, pageLength } from "../redux/UserSlice";

const PaginationButton = () => {
    const token = Cookies.get("token");
  // const token = "416|pqOoA7aRY69T0YLF5pOJTiGgvNHwvtuVl03LUI1L";
  const [count, setCount] = useState(1);
  const { data: users } = useGetContactUserQuery({ token, count });
  const userData = users?.contacts?.data;
  const page = users?.contacts?.total;
  const dispatch = useDispatch();
  // const data = useSelector((state) => console.log(state));
  useEffect(() => {
    dispatch(addUser(userData));
    dispatch(pageLength(page));
  }, [userData, count]);
  return (
    <div className="ms-[30%] my-[18px]">
      <Pagination
        color="green"
        radius="xl"
        total={users?.contacts?.last_page}
        value={count}
        onChange={setCount}
      />
    </div>
  );
};

export default PaginationButton;
