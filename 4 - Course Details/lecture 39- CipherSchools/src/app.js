require("./appMongoose")
const express =require("express");
const Task = require("./models/Task");
const app = express();

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

app.listen(8080, () =>{
    console.log(`Server is running.`);
});

