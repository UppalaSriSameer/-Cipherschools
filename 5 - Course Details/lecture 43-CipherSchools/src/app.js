require("./appMongoose")
const express =require("express");
const Task = require("./models/Task");
const app = express();
const userRouter = require("./routes/user-routes");

app.use(express.json());
app.use("/user",userRouter);

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

app.delete('/delete/:taskId',async(req,res)=>{
    const {taskId}=req.params;
    const deleteResult=await Task.deleteOne({_id:taskId});
    if(!deleteResult.matchedCount){
        return res.status(401).json({
            success:false,
            message:"taskId is not correct"
        })
    }
    return res.status(200).json({
        success:true,
        message:"delete task successfully"
    })
})

app.listen(8080, () =>{
    console.log(`Server is running.`);
});

