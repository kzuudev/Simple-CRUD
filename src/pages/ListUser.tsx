import axios from "axios";
import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import type { User } from "@/types";

import { Button } from "@/components/ui/button";
import EditUser from "./EditUser";

export default function ListUser({
  users,
  refetchUsers,
}: {
  users: User[];
  refetchUsers: () => void;
}) {
  const [selectedUser, setSelectedUser] = useState<number | undefined>(
    undefined,
  );

  const [open, setOpen] = useState(false);

  console.log(selectedUser);
  console.log(open);

  function deleteUser(id: number | undefined) {
    axios
      .delete(`http://localhost/REACT-CRUD/crud/crud-api/delete.php?id=${id}`)
      .then(function (response) {
        console.log(response.data);
        // getUsers();
      });
  }
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
                  <Button
                    onClick={() => {
                      setSelectedUser(user.id);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    className="hover:bg-red-500"
                    onClick={() => deleteUser(user.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            {selectedUser && (
              <EditUser
                id={selectedUser}
                open={open}
                setOpen={setOpen}
                refreshUsers={refetchUsers}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
