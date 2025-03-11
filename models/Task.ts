import { model, models, Schema } from "mongoose";

const TaskSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

const TaskModel = models.Task || model("Task", TaskSchema);
export default TaskModel;
