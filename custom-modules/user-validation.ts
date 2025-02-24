import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

import type { Request, Response, NextFunction } from "express";
import { newServerResponseObj } from "./serverResponseObj.js";

export async function validateUserSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    if (authorization === undefined) throw new Error("Invalid User Session!");

    //! In case the .env file is not accessible, throw an error.
    if (typeof process.env.JWT_KEY === "undefined")
      throw new Error("Cannot decode user data!");

    const decodedUser = jwt.verify(authorization, process.env.JWT_KEY);

    if (!decodedUser) throw new Error("User Session Not Authorized!");

    // Stores the decoded user data, the id and user_name of the user to a new property on the res.locals object.
    res.locals.user = decodedUser;

    next();
  } catch (error: any & { message: string }) {
    // Logs any error to the console and sends a 500 status to indicate an error on the server's end.
    console.log(error);

    res.status(500).send(newServerResponseObj(false, error?.message, ""));
  }
}
