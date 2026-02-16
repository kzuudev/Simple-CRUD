import React, { useState } from "react";
// import ReactDOM from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Button } from "./components/ui/button";

import ListUser from "./pages/ListUser";
import "./App.css";
import CreateUser from "./pages/CreateUser";

// const [open, setOpen] = useState(false);

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="mb-20 flex justify-between">
          <h1 className="font-bold text-2xl">User Management</h1>
        </div>

        <div className="flex justify-between items-center">
          <Link to="/pages/list-user">
            <h2 className="font-medium text-lg">Users</h2>
          </Link>

          <Link to="/pages/create-user">
            <Button>Create User</Button>
          </Link>
        </div>

        <Routes>
          {/* List of Users */}
          <Route path="/" element={<ListUser />}></Route>

          {/* Create User */}
          <Route path="/pages/create-user" element={<CreateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
