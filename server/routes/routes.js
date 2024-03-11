import express from "express";

// This will help us connect to the database
import db from "../db/connections.js";
// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from 'mongodb';

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /routes.
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    console.log("get records");
    let collection = await db.collection("Notes");
    let notes = await collection.find({}).toArray();
    res.send(notes)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting records");
  }
});
// This section will help you create a new Note.
router.post("/", async (req, res) => {
    try {
      console.log(req.body);
      let newNote = {
        title: req.body.title,
        content: req.body.content,
      };
      let collection = db.collection("Notes");
      let result = await collection.insertOne(newNote);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  });

  // This section will help you delete a Note
router.delete("/:id", async (req, res) => {
    try {
      console.log("Note is to be deleted ....");
      console.log(req.params);
      const query = { _id: new ObjectId(req.params.id) };
      let collection = db.collection("Notes");
      let result = await collection.deleteOne(query);
      console.log(result);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
        res.send(result).status(200);
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
        res.status(500).send("Error deleting record");
      }
    } catch (err) {
      console.error(err);   
    }
  });
  
  export default router;