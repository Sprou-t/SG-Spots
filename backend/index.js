// this is the most fundamental file used to build the express app. it listens to port in dev mode
import express, { request, response } from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";
import cors from "cors";
import commentRoutes from "./routes/routes.comment.js";
import userRoutes from "./routes/routes.user.js";
import apiRoutes from "./routes/routes.apiCall.js";

dotenv.config();
const app = express();

// this line allow our express app to parse(read) requests with json payloads(data)
app.use(express.json());
app.use(cors());
app.use("/comment", commentRoutes);
app.use("/user", userRoutes);
app.use("/api", apiRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	connectDb();
	console.log("server listening on Port:", PORT);
});
