import { Tasks } from "@/types";
import Link from "next/link";
import React from "react";

type TaskItemProps = {
  task: Tasks;
  deleteTask: (id: string) => void;
};

export default function TaskItem({ task, deleteTask }: TaskItemProps) {
  return (
    <div className="bg-gray-100 shadow-sm rounded-xl p-4 border border-gray-300 w-72 space-y-3">
      {/* Task Title */}
      <h2 className="text-lg font-semibold text-gray-900">{task.task}</h2>

      {/* Status */}
      <span
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
          task.completed
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {task.completed ? "Completed" : "Not Completed"}
      </span>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`/edit-task/${task._id}`}
          className="bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
