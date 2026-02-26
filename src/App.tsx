import "./App.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components/ui/button";

import ListUser from "./pages/ListUser";
import CreateUser from "./pages/CreateUser";
import { UserContext } from "./pages/UserContext";

import type { User } from "@/types";

function App() {
  const [users, setUsers] = useState<User[]>([]);

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
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ users, getUsers, setUsers }}>
          <div className="w-full text-left mb-20">
            <h1 className="w-full font-bold text-2xl">User Management</h1>
          </div>

          <div className="w-full flex">
            <Link className="w-full text-left" to="/">
              <h2 className="font-medium text-lg ">Users</h2>
            </Link>

            <div className="mt-4">
              <Button asChild>
                <CreateUser />
              </Button>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<ListUser />}></Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
