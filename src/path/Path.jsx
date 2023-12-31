import React from "react";
import { Route, Routes } from "react-router";
import Home from "../component/Home";
import Register from "../component/Register";
import Login from "../component/Login";
import FormGuard from "../component/FormGuard";
import Detail from "../component/Detail";
import EditContact from "../component/Edit";
import CreateContact from "../component/CreateContext";
import ContactTable from "../component/Table/ContactTable";

const Path = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <FormGuard>
            <ContactTable />
          </FormGuard>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/detail/:id"
        element={
          <FormGuard>
            <Detail />
          </FormGuard>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <FormGuard>
            <EditContact />
          </FormGuard>
        }
      />
      <Route
        path="/create"
        element={
          <FormGuard>
            <CreateContact />
          </FormGuard>
        }
      />
    </Routes>
  );
};

export default Path;
