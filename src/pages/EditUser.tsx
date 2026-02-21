import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import type { User } from "@/types";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function EditUser() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

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
      setSuccess("User successfully created!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to create user!");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[500px] flex flex-col p-10 border-2 border-black rounded-sm m-auto ">
      <h1 className="self-start mb-7">Edit User</h1>
      <form className="w-[400px] flex flex-col gap-3 " onSubmit={handleSubmit}>
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

        <div className="flex mt-4 justify-end gap-2 ">
          <Button variant="outline" aria-label="Submit" type="submit">
            Create
          </Button>

          <Link to={"/pages/list-user"}>
            <Button variant="destructive" type="button">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
