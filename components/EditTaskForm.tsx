"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  task: string;
  completed: boolean;
};

type EditTaskFormProps = {
  taskId: string;
};

export default function EditTaskForm({ taskId }: EditTaskFormProps) {
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await axios.get(`/api/task/${taskId}`);
      return {
        task: data.task.task,
        completed: data.task.completed,
      };
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (formData: FormValues) => {
    try {
      const { data, status } = await axios.put(`/api/task/${taskId}`, {
        task: formData.task,
        completed: formData.completed,
      });

      if (status === 200) {
        toast.success(data.message || "Task edit successfully");
        router.push("/");
      }

      console.log(data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <form
        className="flex flex-col space-y-4 w-80 mx-auto mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block">
          <span className="text-gray-700">Task</span>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Task"
            {...register("task", {
              required: "Task is required",
            })}
          />
          <p className="text-[16px] text-red-700">{errors.task?.message}</p>
        </label>

        <label className="block">
          <span className="text-gray-700">Completed </span>
          <select
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register("completed", {
              required: "Completed  is required",
            })}
          >
            <option value={"true"}>True</option>
            <option value={"false"}>False</option>
          </select>
          <p className="text-[16px] text-red-700">
            {errors.completed?.message}
          </p>
        </label>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Edit Task
        </button>
      </form>
    </div>
  );
}
