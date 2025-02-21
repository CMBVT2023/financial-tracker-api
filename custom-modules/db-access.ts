import mysql from "mysql2/promise";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
import { newServerResponseObj } from "./serverResponseObj.js";

dotenv.config();

// Creates a pool to access the db
//* Doing this reduces the time spent connecting to the database by reusing previous connections
//* Instead of closing a connection is it reopened which is useful since all http requests will need access to this database.
// Also, instead of passing in a url, I am passing in an object containing the info necessary to create a url
// from the data in my env file.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export async function loadDB(req: Request, res: Response, next: NextFunction) {
  try {
    // Obtains access to the database and assigns it to the db key for access later down the line.
    res.locals.db = await pool.getConnection();

    // Allows use of variables for inserting http request data safely into sql queries.
    res.locals.db.connection.config.namedPlaceholders = true;

    // Assigns the sql_mode which affects how the database handles data by enabling strict mode for multiple rules to improve data validation.
    await res.locals.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
    // Sets the timezone in cases where the current time will be saved within the database.
    await res.locals.db.query(`SET time_zone = '-8:00'`);

    // Passes to the next middleware function.
    await next();

    // Once this process is returned to, the database connection is released.
    res.locals.db.release();
  } catch (error: any & { message: string }) {
    // Logs any error to the console and sends a 500 status to indicate an error on the server's end.
    console.log(error);
    // Also, if necessary, releases the database if it was successfully mounted.
    if (res.locals.db) res.locals.db.release();
    res.status(500).send(newServerResponseObj(false, error?.message, ""));
  }
}
