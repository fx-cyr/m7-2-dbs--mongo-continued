"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getSeats = async (req, res) => {
  try {
    console.log(MONGO_URI);
    const client = MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("seats");
    const result = db.collection("allSeats").find().toArray();
    console.log(result);
    if (result.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "All seats retrieved",
        data: result,
      });
    }
  } catch (err) {
    console.log(err.stack);
    return res.status(404).json({
      status: 404,
      message: "Failed to retrieve all seats",
    });
  }
  // client.close();
};

module.exports = { getSeats };
