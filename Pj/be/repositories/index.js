const mongodb = require("mongodb");

const db = {}

const client = new mongodb.MongoClient("mongodb://localhost:27017")

client.connect().then((connectedClient) => {
    console.log("Mongodb connected");
    const database = connectedClient.db("cookpad");
    db.users = database.collection("users"); 
    db.dishs = database.collection("dishs") 
})

module.exports = db;