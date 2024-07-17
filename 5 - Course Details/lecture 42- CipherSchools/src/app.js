require("./appMongoose")
const express =require("express");
const Task = require("./models/Task");
const app = express();

app.use(express.json());

app.get("/",(req, res)=>{
    res.send("This is some responses from your first node.js server");
});

app.get("/add",(req, res)=>{
    let {a: firstnumber, b: secondnumber} = req.query;
    let sum = parseInt(firstnumber) + parseInt(secondnumber);
    res.send({sum});
});

app.post("/add-task", async (req,res)=>{
    const task = new Task({title: "Test Task", description: "Test Task Desc"});
    await task.save();
    return res.status(201).send({message: "Saved"});
})

app.get("/get-tasks", async(req,res)=>{
    const taskList = await Task.find();
    return res.status(200).send(taskList);
})

app.put("/update/:taskId", async(req, res)=>{
    const {taskId} = req.params;
    const updateResult = await Task.updateOne(
        { _id: taskId},
        {
            $set: {...req.body},
        }
    );
    if(!updateResult.matchedCount){
        return res.status(404).send({message: `Task with ID: ${taskId} was not found.` });
    }
    return res.status(200).send({message: "Update Success"});
});

app.delete("/delete-task/:taskId", async(req, res)=>{
    const {taskId} = req.params;
    const deleteResult = await Task.deleteOne(
        { _id: taskId}
    );
    if(!deleteResult.deletedCount){
        return res.status(404).send({message: `Task with ID: ${taskId} was not found.` });
    }
    return res.status(200).send({message: "deleted Success"});
});

app.listen(8080, () =>{
    console.log(`Server is running.`);
});

