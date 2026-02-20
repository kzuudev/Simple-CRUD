import React, { useState } from "react";
import type { User } from "@/types";
import axios from "axios";

import { Link, useParams } from "react-router-dom";

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

export default function CreateUser() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      setError("");

      console.log(response.data);
      alert("User created successfully!");
    } catch (error) {
      console.error(error);
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <div className="w-[500px] flex flex-col rounded-sm m-auto ">
        <DialogTrigger>Create User</DialogTrigger>

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
