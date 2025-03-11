import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import UserModel from "@/models/User";
import TaskModel from "@/models/Task";

// create new task

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { task, completed } = await req.json();

    if (!task || !completed) {
      return NextResponse.json(
        { error: "Task and Completed is required" },
        { status: 400 }
      );
    }

    const findUser = await UserModel.findById(session.user?.id);

    if (!findUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newTask = await TaskModel.create({ task, completed });

    findUser.tasks.push(newTask._id);

    await findUser.save();
    return NextResponse.json(
      { message: "Task created successfully" },
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

// get all task

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userTasks = await UserModel.findById(session.user.id).populate(
      "tasks"
    );

    return NextResponse.json(
      { message: "Get all tasks", tasks: userTasks.tasks },
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
