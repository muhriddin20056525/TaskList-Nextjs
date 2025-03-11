import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongodb is alread connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "TaskList",
    });
    isConnected = true;

    console.log("MongoDb is connected successfully");
  } catch (error) {
    console.log(error);
  }
};
