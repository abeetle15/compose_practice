import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getLatestMessage, postMessage } from "./controllers.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://db:27017/diary")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5001, () => {
      console.log("Server is listening at port 5001");
    });
  })
  .catch((error) => console.error("Connection to MongoDB failed", error));

app.get("/api", getLatestMessage);
app.post("/api", postMessage);
