import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task", default: [] }], // "Task" (ko‘plik emas!)
});

const UserModel = models.User || model("User", UserSchema);
export default UserModel;
