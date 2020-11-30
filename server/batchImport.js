"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const assert = require("assert");

const batchImport = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("seats");
    console.log("connected");
    const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (let r = 0; r < row.length; r++) {
      for (let s = 1; s < 13; s++) {
        const seat = {
          _id: `${row[r]}-${s}`,
          price: 225,
          isBooked: false,
        };
        const result = await db.collection("allSeats").insertOne(seat);
        assert.strictEqual(1, result.insertedCount);
      }
    }
  } catch (err) {
    return console.log(err.stack);
  }
  client.close();
  console.log("disconnected");
};

batchImport();
