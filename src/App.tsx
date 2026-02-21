import React, { useState } from "react";
import axios from "axios";
// import ReactDOM from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "./components/ui/button";

import ListUser from "./pages/ListUser";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="w-full text-left mb-20">
          <h1 className="w-full font-bold text-2xl">User Management</h1>
        </div>

        <div className="w-full flex">
          <Link className="w-full text-left" to="/pages/list-user">
            <h2 className="font-medium text-lg ">Users</h2>
          </Link>

          <Button className="w-full" asChild>
            <CreateUser />
          </Button>
        </div>

        <Routes>
          {/* List of Users */}
          <Route path="/" element={<ListUser />}></Route>
        </Routes>
        <ListUser />
      </BrowserRouter>
    </>
  );
}

export default App;
