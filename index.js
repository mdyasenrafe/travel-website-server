const express = require("express");
const app = express();
require("dotenv").config();
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5iwe9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("touristGang");
    const destinationsCollection = database.collection("destinations");

    app.get("/destinations", async (req, res) => {
      const cursor = destinationsCollection.find();
      const result = await cursor.toArray();
      console.log(result, "hitting the post");
      res.send(result);
    });

    console.log("database connect");
  } finally {
  }
}
run().catch(console.dir);

//
app.get("/", (req, res) => {
  res.send("<h1>This is Tourist Gang Server</h1>");
});

// listen
app.listen(port, () => {
  console.log("succesfully run by ", port);
});
