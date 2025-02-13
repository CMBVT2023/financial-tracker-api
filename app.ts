import express from "express";
import cors from 'cors';
import { serverResponseObj } from "./serverResponseObj.js";

const server = express();

// Enables the default cors for the server
server.use(cors());

// Temp placeholder
const port = 1000;

// Parse all body data into json
server.use(express.json())

server.get('/test', (req, res) => {
    console.log('Connection made...')
    res.status(200).json(serverResponseObj(true, 'Connection made...', 'none'));
})

server.listen(port, () => {
    console.log(`Sever listening on port https://localhost:${port}.`);
})
