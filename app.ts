import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { newServerResponseObj } from "./custom-modules/serverResponseObj.js";
import userRouter from "./custom-modules/user-access-router.js";
import financialEntryRouter from "./custom-modules/financial-entry-router.js";
import { loadDB } from "./custom-modules/db-access.js";

import type { Request, Response, NextFunction } from "express";
import { validateUserSession } from "./custom-modules/user-validation.js";

// Loads the main .env file
dotenv.config();

const server = express();

// Enables the default cors for the server
server.use(cors());

// Parses the body of any request into valid json.
server.use(express.json());

// Temp placeholder
const port = process.env.PORT;

server.use(loadDB);

server.get("/test", (req, res) => {
  console.log("Connection made...");
  res
    .status(200)
    .json(newServerResponseObj(true, "Connection made...", "none"));
});

server.use("/user", userRouter);

server.use("/entries", validateUserSession, financialEntryRouter);

server.listen(port, () => {
  console.log(`Sever listening on port http://localhost:${port}.`);
});
