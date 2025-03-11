import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import UserModel from "@/models/User";
import TaskModel from "@/models/Task";
import { authOptions } from "@/lib/user";

// get single task

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const singleTask = await TaskModel.findById(params.id);

    if (!singleTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Get single task", task: singleTask },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// delete task

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.tasks = user.tasks.filter((id: string) => id.toString() !== params.id);
    await user.save();

    const deleteTask = await TaskModel.findByIdAndDelete(params.id);

    return Response.json({ message: "Task deleted", user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// edit task

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const { task, completed } = await req.json();

    if (!task || !completed) {
      return NextResponse.json(
        { error: "Task and Completed is required" },
        { status: 400 }
      );
    }

    await TaskModel.findByIdAndUpdate(
      params.id,
      { task, completed },
      { new: true }
    );

    return NextResponse.json({ message: "Edited task" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
