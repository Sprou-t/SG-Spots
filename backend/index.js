import express, {request,  response} from "express";

const app = express();

// this line allow our express app to parse(read) requests with json payloads(data)
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log("server listening on Port:", PORT);
})