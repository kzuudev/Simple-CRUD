import React, { useState, useContext } from "react";
import { type FormError, type User } from "@/types";
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

import { UserContext } from "./UserContext";

export default function CreateUser() {
  const [error, setError] = useState<FormError>({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const context = useContext(UserContext);

  if (!context) return null;

  const { getUsers } = context;

  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    phone: "",
    address: "",
    created_at: "",
    updated_at: "",
  });

  const validate = (): boolean => {
    const errors: FormError = {};

    if (!form.name) errors.name = "Name is required";
    if (!form.email || !form.email.includes("@"))
      errors.email = "Invalid Email";
    if (form.phone.length < 10) errors.phone = "Phone is too short";

    setError(errors);

    // check if there's no error
    return Object.keys(errors).length === 0;
  };

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
      const isValid = validate();

      if (!isValid) {
        return;
      } else {
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
        getUsers();
        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          created_at: "",
          updated_at: "",
        });
      }
    } catch (error) {
      console.error(error);
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
            {error.name && (
              <span className="text-xs text-red-500">{error.name}</span>
            )}
            <Input
              placeholder="Email"
              value={form.email}
              name="email"
              onChange={handleChange}
              required
            />
            {error.email && (
              <span className="text-xs text-red-500">{error.email}</span>
            )}
            <Input
              placeholder="Phone"
              value={form.phone}
              name="phone"
              onChange={handleChange}
              required
            />
            {error.phone && (
              <span className="text-xs text-red-500">{error.phone}</span>
            )}
            <Input
              placeholder="Address"
              value={form.address}
              name="address"
              onChange={handleChange}
              required
            />
            {error.address && (
              <span className="text-xs text-red-500">{error.address}</span>
            )}
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
