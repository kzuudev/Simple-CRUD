import React, { useState } from "react";
import type { User } from "@/types";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

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

export default function CreateUser({
  // Destructuring
  refreshUsers,
}: {
  refreshUsers: () => void;
}) {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    phone: "",
    address: "",
    created_at: "",
    updated_at: "",
  });

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
      console.log("Form submitted", form);

      const response = await axios.post(
        "http://localhost/REACT-CRUD/crud/crud-api/create.php",
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setOpen(false);
      setLoading(true);
      setError("");
      refreshUsers();
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        created_at: "",
        updated_at: "",
      });
    } catch (error) {
      console.error(error);
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col rounded-sm m-auto ">
        <DialogTrigger className="px-4 py-2 bg-black text-white text-nowrap rounded-md">
          Create User
        </DialogTrigger>

        <DialogContent>
          <form className="flex flex-col py-6 gap-3 " onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>New User</DialogTitle>
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

            {error && <p className="text-red-500">{error}</p>}

            <Input
              placeholder="Email"
              value={form.email}
              name="email"
              onChange={handleChange}
              required
            />
            {error && <p className="text-red-500">{error}</p>}

            <Input
              placeholder="Phone"
              value={form.phone}
              name="phone"
              onChange={handleChange}
              required
            />
            {error && <p className="text-red-500">{error}</p>}

            <Input
              placeholder="Address"
              value={form.address}
              name="address"
              onChange={handleChange}
              required
            />
            {error && <p className="text-red-500">{error}</p>}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="destructive" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="outline" aria-label="Submit" type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
