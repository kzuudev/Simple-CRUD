import "./App.css";
import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components/ui/button";

import ListUser from "./pages/ListUser";
import CreateUser from "./pages/CreateUser";

import type { User } from "@/types";

function App() {
  const UserContext = createContext([]);

  const [users, setUsers] = useState<User[]>([]);

  <UserContext value={users}></UserContext>;
  function getUsers() {
    axios
      .get("http://localhost/REACT-CRUD/crud/crud-api/index.php")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);

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
            <CreateUser refreshUsers={getUsers} />
          </Button>
        </div>

        <Routes>
          {/* List of Users */}

          {/* <Route path="/pages/user/:id" element={<EditUser />}></Route> */}
          <Route
            path="/"
            element={<ListUser users={users} refetchUsers={getUsers} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
