const express =require("express");
const app = express();

app.get("/",(req, res)=>{
    res.send("This is some responses from your first node.js server");
});

app.get("/add",(req, res)=>{
    let {a: firstnumber, b: secondnumber} = req.query;
    let sum = parseInt(firstnumber) + parseInt(secondnumber);
    res.send({sum});
});

app.listen(8080, () =>{
    console.log(`Server is running.`);
});

