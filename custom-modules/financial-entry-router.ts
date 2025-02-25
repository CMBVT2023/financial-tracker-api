import express from "express";
import dotenv from "dotenv";

import { newServerResponseObj } from "./serverResponseObj.js";
import type { Request, Response, NextFunction } from "express";

dotenv.config();

// Initializes a new router to handle all endpoints associated with accessing or altering the financial entries table.
const financialEntryRouter = express.Router();

financialEntryRouter.get(
  "/all-financial-entries",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userID, user_name } = res.locals.user;
      const [financialEntries] = await res.locals.db.query(
        `SELECT * FROM financial_entries WHERE user_id = :userID AND delete_flag IS Null`,
        {
          userID: res.locals.user.id,
        }
      );

      res
        .status(200)
        .json(
          newServerResponseObj(
            true,
            `Gathered all ${user_name}'s financial entries.`,
            {entriesArray: financialEntries}
          )
        );
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
      // Pulls financial entry info from the request body.
      //! itemQuantity and itemManufacturer are optional, a null value indicates they will be left empty.
      const {
        itemName,
        itemCost,
        purchasedFrom,
        itemQuantity,
        itemManufacturer,
      } = req.body;
      const { id: userID, user_name } = res.locals.user;

      const query = await res.locals.db.query(
        `INSERT INTO financial_entries (item_name, item_cost, purchased_from, user_id, item_quantity, manufacturer)
         VALUES (:itemName, :itemCost, :purchasedFrom, :userID, :itemQuantity, :itemManufacturer)`,
        {
          itemName,
          itemCost,
          purchasedFrom,
          userID,
          itemQuantity,
          itemManufacturer,
        }
      );

      res
        .status(200)
        .json(
          newServerResponseObj(
            true,
            `Financial entry successfully added to ${user_name}'s financial planner.`,
            ""
          )
        );
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
      const {
        newItemName,
        newItemCost,
        newPurchasedFrom,
        newItemQuantity,
        newItemManufacturer,
        entryID,
      } = req.body;
      const { id: userID, user_name } = res.locals.user;

      const query = await res.locals.db.query(
        `UPDATE financial_entries SET 
        item_name = :newItemName, 
        item_cost = :newItemCost, 
        purchased_from = :newPurchasedFrom, 
        item_quantity = :newItemQuantity, 
        manufacturer = :newItemManufacturer 
        WHERE entry_id = :entryID AND user_id = :userID AND delete_flag IS NULL
        `,
        {
          newItemName,
          newItemCost,
          newPurchasedFrom,
          newItemQuantity,
          newItemManufacturer,
          entryID,
          userID,
        }
      );

      res
        .status(200)
        .json(
          newServerResponseObj(
            true,
            `Successfully updated financial entry in ${user_name}'s financial table`,
            ""
          )
        );
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
      const { entryID } = req.body;
      const { id: userID, user_name } = res.locals.user;

      const query = res.locals.db.query(
        `UPDATE financial_entries SET
          delete_flag = 1
          WHERE entry_id = :entryID AND user_id = :userID
        `,
        {
          entryID,
          userID,
        }
      );

      res
        .status(200)
        .json(
          newServerResponseObj(
            true,
            `Successfully deleted item entry from ${user_name}'s financial table.`,
            ""
          )
        );
    } catch (error: any & { message: string }) {
      // Logs any error to the console and sends a 500 status to indicate an error on the server's end.
      console.log(error);
      res.status(500).send(newServerResponseObj(false, error?.message, ""));
    }
  }
);

export default financialEntryRouter;
