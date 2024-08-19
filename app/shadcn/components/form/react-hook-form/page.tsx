"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

export default function ExampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          {...register("username", { required: true, minLength: 5 })}
        />
        {errors.username && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="email" className="mt-2">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>This field is required</span>}

        <Input type="submit" value="Submit" />
      </div>
    </form>
  );
}
