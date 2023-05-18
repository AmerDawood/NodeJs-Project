const { MongoClient } = require("mongodb");

// const _uri = "mongodb+srv://hashemalkeshawi:Abu3mar_mongodb_0@cluster0.lx2mueo.mongodb.net/test_1?retryWrites=true&w=majority";
const _uri = "mongodb://localhost:27017";
const connection = (collection, cb) => {
    MongoClient.connect(_uri).then(async (client) => {
        const db = client.db('test').collection(collection)
        await cb(db)
        client.close
    }).catch();
}

module.exports = connection