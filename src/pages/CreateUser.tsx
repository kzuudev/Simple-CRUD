import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { User, FormError } from "@/types";
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

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

    const UserSchema = z.object({
    name: z.string().min(1,{message: "Name is required"}),
    email: z.string().email({message: "Invalid email address"}),
    phone: z.string().min(10, { message: "Phone must be at least 10 digits" }),
    address: z.string().min(5, {message: "Address is too short"}),


    id: z.number().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional()
  });

  type UserFormValues = z.infer<typeof UserSchema>;

  const {register, handleSubmit, reset, formState: { errors }} = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: ""
    }
    
  })


  const context = useContext(UserContext);
  if (!context) return null;

  const { getUsers } = context;


  // const [form, setForm] = useState<User>({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   created_at: "",
  //   updated_at: "",
  // });

  // const validate = (): boolean => {
  //   const errors: FormError = {};

  //   if (!form.name) errors.name = "Name is required";
  //   if (!form.email || !form.email.includes("@"))
  //     errors.email = "Invalid Email";
  //   if (form.phone.length < 10) errors.phone = "Phone is too short";

  //   setError(errors);

  //   // check if there's no error
  //   return Object.keys(errors).length === 0;
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   // Update state of each input safely
  //   setForm((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const isValid = validate();

  //     if (!isValid) {
  //       return;
  //     } else {
  //       const response = await axios.post(
  //         "http://localhost/REACT-CRUD/crud/crud-api/create.php",
  //         form,
  //         {
  //           withCredentials: true,
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         },
  //       );
  //       setOpen(false);
  //       setLoading(true);
  //       getUsers();
  //       setForm({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         address: "",
  //         created_at: "",
  //         updated_at: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const onSubmit = async (data: UserFormValues) => {
      setLoading(true);

      try{
        const response = await axios.post("http://localhost/REACT-CRUD/crud/crud-api/create.php", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        })
        console.log(response);
        setOpen(false);
        getUsers();
        reset();
      }catch (err) {
        console.error("Submission failed", err);
      }finally{
        setLoading(false);
      }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col rounded-sm m-auto ">
        <DialogTrigger className="px-4 py-2 bg-black text-white text-nowrap rounded-md">
          Create User
        </DialogTrigger>

        <DialogContent>
          <form className="flex flex-col pt-5 gap-3" onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>New User</DialogTitle>
              <DialogDescription className="mb-4">
                Make sure to provide necessary details here. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            
            <div>
              <Input
              type="text"
              placeholder="Name"
              // name="name"
              {...register("name")}
            />
            {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name?.message}</p>}
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Email"
                // name="email"
                {...register("email")}
              />
            {errors.name && <p className="mt-2 text-xs text-red-500">{errors.email?.message}</p>}
            </div>
            
            
          <div>
            <Input
              type="number"
              placeholder="Phone"
              {...register("phone")}
            />
            {errors.name && <p className="mt-2 text-xs text-red-500">{errors.phone?.message}</p>}
          </div>
            
            <div>
              <Input
                type="text"
                placeholder="Address"
                {...register("address")}
              />
            </div>
            {errors.name && <p className="mt-2 text-xs text-red-500">{errors.address?.message}</p>}
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
