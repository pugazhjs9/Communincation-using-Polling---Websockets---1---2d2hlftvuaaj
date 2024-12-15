const { timeStamp } = require("console");
const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

const messages = [];

app.get("/findMessages",(req,res)=>{
  return res.status(200).json({"messages":messages})
})

app.post("/message",(req,res)=>{
  const {text,user} = req.body;
  if (!text || !user){
    return res.status(400).json({"error": "Please provide a valid input"})
  }
  try{
    const data = {"user":user,"text":text,"timestamp":new Date().toISOString()}
    messages.push(data)
    return res.status(200).json({"message":data})
  }catch(err){
    console.log(err)
    return res.status(500).json({error:"Internal server Error"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app, messages };
