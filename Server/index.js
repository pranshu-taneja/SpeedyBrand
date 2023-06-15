import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import Topic from "./model/topic.js";
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
        const details = await Topic.find();
        res.send(details)
    }
    catch(error){
        res.status(500).send(`Some error occured: ${error}`)
    }
})


// Connect to MongoDB
const connectToDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error(err);
      setTimeout(connectToDB, 1000); // Retry connection after delay
    }
  };

  // Start server when connected to MongoDB
const startServer = async () => {
    try {
      await connectToDB();
      app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

startServer();

