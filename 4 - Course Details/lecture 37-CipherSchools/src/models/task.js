const {model, Schema} = require("mongoose");

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isComplete: {
            type: Boolean,
            default: false,
        },
        // owner: {
        //     type: Schema.Types.ObjectId, 
        //     require: true,
        //     ref: "User",
        // }
    },
    {timeStamps: true}
);

const TaskModel =model("Task", TaskSchema);

model.export = TaskModel;
