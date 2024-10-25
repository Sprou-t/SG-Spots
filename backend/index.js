// this is the most fundamental file used to build the express app. it listens to port in dev mode
import express, { request, response } from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";
import cors from "cors";

dotenv.config();
const app = express();

// this line allow our express app to parse(read) requests with json payloads(data)
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDb();
  console.log("server listening on Port:", PORT);
});
