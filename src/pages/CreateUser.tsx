import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import type { User } from "@/types";
import { Link } from "react-router-dom";

export default function CreateUser() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.FormEvent) => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  };

  return (
    <div className="w-[500px] flex flex-col p-10 border-2 border-black rounded-sm m-auto ">
      <h1 className="self-start mb-7">New User</h1>
      <form
        className="w-[400px] flex flex-col gap-3 "
        action=""
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => e.target.value}
        />

        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => e.target.value}
        />

        <Input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => e.target.value}
        />

        <Input
          placeholder="Address"
          value={form.address}
          onChange={(e) => e.target.value}
        />

        <div className="flex mt-4 justify-end gap-2 ">
          <Button variant="outline" aria-label="submit">
            Create
          </Button>
          <Link to={"/pages/list-user"}>
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
