import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { newServerResponseObj } from "./serverResponseObj.js";
import type { Request, Response, NextFunction } from "express";

dotenv.config();

// Initializes a router to handle all endpoints that start with "/user"
const userRouter = express.Router();

userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, userKey } = req.body;

      const [[user]] = await res.locals.db.query(
        `SELECT * FROM users WHERE user_name = :userName`,
        {
          userName,
        }
      );

      if (!user) throw new Error("Username or password is incorrect.");

      // Pulls the hashed password from the database to compare against the password the user has entered.
      const hashedKey = `${user.user_key}`;
      const isPasswordAMatch = await bcrypt.compare(userKey, hashedKey);

      // If the entered password does not match, throw an error to the user.
      if (!isPasswordAMatch)
        throw new Error("Username or password is incorrect.");

      // Constructs a payload within a json object that will be returned to the user
      // and will be used to store the user's session details.
      const jsonPayload = {
        id: user.user_id,
        username: user.user_name,
      };

      //! In case the .env file is not accessible, throw an error.
      if (typeof process.env.JWT_KEY === "undefined")
        throw new Error("Cannot encode user data!");

      // Creates the encoded user session that will then be returned to the user and stored in their browser.
      const jwtEncodedUser = jwt.sign(jsonPayload, process.env.JWT_KEY);

      res
        .status(200)
        .json(
          newServerResponseObj(true, "User successfully signed in.", {
            jwt: jwtEncodedUser,
          })
        );
    } catch (error: any & { message: string }) {
      // Logs any error to the console and sends a 500 status to indicate an error on the server's end.
      console.log(error);

      if (error?.message === "Username or password is incorrect.") {
        res.status(300).send(newServerResponseObj(false, error?.message, ""));
        return;
      }

      res.status(500).send(newServerResponseObj(false, error?.message, ""));
    }
  }
);

userRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, userKey } = req.body;

      const hashedKey = await bcrypt.hash(userKey, 10);

      const [user] = await res.locals.db.query(
        `INSERT INTO users (user_name, user_key)
            VALUES (:userName, :hashedKey)`,
        {
          userName,
          hashedKey,
        }
      );

      // Constructs a payload within a json object that will be returned to the user
      // and will be used to store the user's session details.
      const jsonPayload = {
        id: user.insertId,
        userName,
      };

      //! In case the .env file is not accessible, throw an error.
      if (typeof process.env.JWT_KEY === "undefined")
        throw new Error("Cannot encode user data!");

      // Creates the encoded user session that will then be returned to the user and stored in their browser.
      const jwtSignedUser = jwt.sign(jsonPayload, process.env.JWT_KEY);

      res
        .status(200)
        .json(
          newServerResponseObj(true, "User successfully registered.", {
            jwt: jwtSignedUser,
          })
        );
    } catch (error: any & { message: string }) {
      // Logs any error to the console and sends a 500 status to indicate an error on the server's end.
      console.log(error);

      if (error?.message === "Username or password is incorrect.") {
        res.status(300).send(newServerResponseObj(false, error?.message, ""));
        return;
      }

      res.status(500).send(newServerResponseObj(false, error?.message, ""));
    }
  }
);

export default userRouter;
