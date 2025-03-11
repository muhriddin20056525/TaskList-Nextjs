"use client";

import EditTaskForm from "@/components/EditTaskForm";
import { useParams } from "next/navigation";

export default function EditTask() {
  const { id } = useParams();
  const taskId = Array.isArray(id) ? id[0] : id || "";

  return (
    <div>
      <EditTaskForm taskId={taskId} />
    </div>
  );
}
