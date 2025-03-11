"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (formData: FormValues) => {
    try {
      const response = await axios.post("/api/auth/register", formData);
      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-1/2 shadow-lg bg-white px-5 py-10 rounded-md">
        <h2 className="text-3xl text-center mb-4 font-medium">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="text-[18px] mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register("username", {
                required: "username is required",
              })}
            />
            <p className="text-[16px] text-red-700">
              {errors.username?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-[18px] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            <p className="text-[16px] text-red-700">{errors.email?.message}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-[18px] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register("password", {
                required: "password is required",
              })}
            />
            <p className="text-[16px] text-red-700">
              {errors.password?.message}
            </p>
          </div>

          <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Register
          </button>
        </form>

        <Link href={"/login"} className="mt-4 block text-right text-purple-700">
          Go to Login page
        </Link>
      </div>
    </div>
  );
}
