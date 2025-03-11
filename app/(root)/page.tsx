"use client";

import Loader from "@/components/Loader";
import TaskItem from "@/components/TaskItem";
import { Tasks } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[] | []>([]);

  // get all task
  const getAllTasks = async () => {
    try {
      const { data } = await axios.get("/api/task");
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  // delete task
  const deleteTask = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/task/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [tasks]);

  return (
    <div className="flex justify-center gap-3 py-10">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem task={task} deleteTask={deleteTask} key={task._id} />
        ))
      ) : (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
