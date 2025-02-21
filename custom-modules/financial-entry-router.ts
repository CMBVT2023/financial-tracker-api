import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { newServerResponseObj } from "./serverResponseObj.js";
import type { Request, Response, NextFunction } from "express";

dotenv.config();

// Initializes a new router to handle all endpoints associated with accessing or altering the financial entries table.
const financialEntryRouter = express.Router();

financialEntryRouter.get(
  "/allFinancialEntries",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any & { message: string }) {
      // Logs any error to the console and sends a 500 status to indicate an error on the server's end.
      console.log(error);
      res.status(500).send(newServerResponseObj(false, error?.message, ""));
    }
  }
);

financialEntryRouter.post(
  "/add-financial-entry",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any & { message: string }) {
      // Logs any error to the console and sends a 500 status to indicate an error on the server's end.
      console.log(error);
      res.status(500).send(newServerResponseObj(false, error?.message, ""));
    }
  }
);

financialEntryRouter.put(
  "/edit-financial-entry",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any & { message: string }) {
      // Logs any error to the console and sends a 500 status to indicate an error on the server's end.
      console.log(error);
      res.status(500).send(newServerResponseObj(false, error?.message, ""));
    }
  }
);

financialEntryRouter.delete(
  "/remove-financial-entry",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any & { message: string }) {
      // Logs any error to the console and sends a 500 status to indicate an error on the server's end.
      console.log(error);
      res.status(500).send(newServerResponseObj(false, error?.message, ""));
    }
  }
);

export default financialEntryRouter;
