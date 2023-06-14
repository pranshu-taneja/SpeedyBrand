import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import Topic from "./model/topic.js";
import topic from "./model/topic.js";
import CORS from "cors"


const app = Express()
dotenv.config();
app.use(morgan('combined'));
app.use(Express.json())
app.use(CORS());

const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send("<h1>Javascript</h1>")
})

app.post("/addtopic", async (req, res) => {
    try {
        const details = await req.body;
        const topic = new Topic(details);
        await topic.save();
        res.send({ data: topic })
    }
    catch(error){
        res.status(500).send(`Some Error Occured: ${error}`)
    }
})

app.get("/gettopics", async(req,res)=>{
    try{
        const details = await topic.find();
        res.send(details)
    }
    catch(error){
        res.status(500).send(`Some error occured: ${error}`)
    }
})



app.listen(port, async () => {
    await mongoose.connect("mongodb://localhost:27017").then(() => {
        console.log("mongodb Connected successfully");
        console.log(`Server is listening on port ${port}`);
    })
})

