
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://naufalsoerya:r6L30uaXRxG7IXsU@gc01-p3.utp1yek.mongodb.net/?retryWrites=true&w=majority&appName=GC01-P3";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("GC01-P3");

module.exports = { database }
