import React from "react";
import Login from "./component/Login";
import Register from "./component/Register";
import { Route, Routes } from "react-router";
import Navbar from "./component/Navbar/Navbar";
import CreateContact from "./component/CreateContext";
import ContactTable from "./component/Table/ContactTable";
import Home from "./component/Home";
import Path from "./path/Path";
const App = () => {
  return (
    <div className="">
      <Path />
    </div>
  );
};

export default App;
