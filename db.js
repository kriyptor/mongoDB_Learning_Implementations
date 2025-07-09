const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DB_URI);
let db;

async function connectToDb() {
    if(db) return db;
    await client.connect();
    db = client.db('library');
    return db;
};

module.exports = { connectToDb };