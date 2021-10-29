const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 5000;

// middlecors
app.use(cors());
app.use(express.json());

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
    const ordersCollection = database.collection("orders");
    // get api
    app.get("/destinations", async (req, res) => {
      const cursor = destinationsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/orders", async (req, res) => {
      const orders = req.body;
      const result = await ordersCollection.insertOne(orders);
      res.json(result);
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
