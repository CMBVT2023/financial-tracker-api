import type { RequestWithDataBase } from "./db-access";
import express from "express";
import type { NextFunction } from 'express';

// Initializes a router to handle all endpoints that start with "/user"
const userRouter = express.Router()

userRouter.get("/login", async (req: RequestWithDataBase, res: Response, next: NextFunction) => {
    const { userName, useKey } = req.body;

    
})

userRouter.get("/register", )

export default userRouter;