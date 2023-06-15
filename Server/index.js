import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import Topic from "./model/topic.js";
import CORS from "cors"
import {OpenAIApi, Configuration} from "openai"


const app = Express()
dotenv.config();
app.use(morgan('combined'));
app.use(Express.json())
app.use(CORS());

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
  catch (error) {
    res.status(500).send(`Some Error Occured: ${error}`)
  }
})

app.get("/gettopics", async (req, res) => {
  try {
    const details = await Topic.find();
    res.send(details)
  }
  catch (error) {
    res.status(500).send(`Some error occured: ${error}`)
  }
})

app.post("/deletetopic", async (req, res) => {
  try {
    const { id } = req.body;

    await Topic.deleteOne({ _id: id }).then(() => {
      res.status(200).send(`${id} deleted successfully`);
    })
  } catch (error) {
    res.status(500).send("Error occurred while deleting the topic.");
  }
});


const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);
app.post("/generate", async (req, res) => {
  try {
    const { prompt, tone } = await req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
              Write On the following topic:
              ${prompt} -- in a ${tone} tone   
              ###
            `,
      max_tokens: 1000,
      temperature: 0.5,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      // stop: ["\n"],
    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});


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

