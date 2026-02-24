import React, { useState, useEffect } from "react";
import type { User } from "@/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EditUserProps = {
  id?: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshUsers: () => void;
};

export default function EditUser({
  id,
  open,
  setOpen,
  refreshUsers,
}: EditUserProps) {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // const [open, setOpen] = useState(false);

  // const { id } = useParams();
  // console.log(id);

  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    phone: "",
    address: "",
    created_at: "",
    updated_at: "",
  });

  // Get user based on the selected user (ID)
  function getUser() {
    axios
      .get(`http://localhost/REACT-CRUD/crud/crud-api/edit.php?id=${id}`)
      .then((response) => {
        console.log("Fetched user:", response.data);
        setForm(response.data);
      })
      .catch((err) => console.error(err));
  }

  // Fetch the user when pages loads and re-fetch user if ID changes
  useEffect(() => {
    getUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update state of each input safely
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put<{ user: User }>(
        `http://localhost/REACT-CRUD/crud/crud-api/edit.php?id=${id}`,
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setLoading(true);
      setError("");
      setSuccess("User successfully updated!");

      refreshUsers();
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to update user!");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col rounded-sm m-auto">
        <DialogContent>
          <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
            <DialogHeader className="mb-3">
              <DialogTitle>Update User</DialogTitle>
              <DialogDescription>
                Make sure to provide necessary details here. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <Input
              placeholder="Name"
              value={form.name}
              name="name"
              onChange={handleChange}
              required
            />

            <Input
              placeholder="Email"
              value={form.email}
              name="email"
              onChange={handleChange}
              required
            />

            <Input
              placeholder="Phone"
              value={form.phone}
              name="phone"
              onChange={handleChange}
              required
            />

            <Input
              placeholder="Address"
              value={form.address}
              name="address"
              onChange={handleChange}
              required
            />

            <DialogFooter className="mt-4">
              <DialogClose>
                <Button variant="outline" aria-label="Submit" type="submit">
                  Save Changes
                </Button>

                {/* <Link to={"/pages/list-user"}>
                <Button variant="destructive" type="button">
                  Cancel
                </Button>
              </Link> */}
              </DialogClose>

              <DialogClose>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
