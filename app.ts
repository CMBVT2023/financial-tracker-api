import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { serverResponseObj } from "./custom-modules/serverResponseObj.js";
import userRouter from "./custom-modules/user-access-router.js";
import bodyParser from "body-parser"

// Loads the main .env file
dotenv.config();

const server = express();

// Enables the default cors for the server
server.use(cors());

// Parses the body of any request into valid json.
server.use(bodyParser.json());

// Temp placeholder
const port = process.env.PORT;

// Parse all body data into json
server.use(express.json())

server.get('/test', (req, res) => {
    console.log('Connection made...')
    res.status(200).json(serverResponseObj(true, 'Connection made...', 'none'));
})

server.get("/user", userRouter);

server.listen(port, () => {
    console.log(`Sever listening on port https://localhost:${port}.`);
})
