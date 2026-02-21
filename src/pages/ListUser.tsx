import axios from "axios";
import { useState, useEffect } from "react";
import type { User } from "@/types";

import { Button } from "@/components/ui/button";

export default function ListUser() {
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
    <div className="mt-15">
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr className="w-full align-middle text-left">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, key) => (
              <tr
                className="w-full border-b-2 border-gray-100 text-left"
                key={key}
              >
                <td className="py-4">{user.name}</td>
                <td className="py-4">{user.email}</td>
                <td className="py-4">{user.phone}</td>
                <td className="py-4">{user.address}</td>
                <td className="py-4">{user.created_at}</td>
                <td className="py-4">{user.updated_at}</td>
                <td className="flex py-4 gap-2 align-middle text-left">
                  <Button>Edit</Button>
                  <Button variant="destructive">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
