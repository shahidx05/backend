
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = `mongodb+srv://shahidx05:2005%40Shahid@cluster0.rrnfc1t.mongodb.net/`
const client = new MongoClient(url);

// Database Name
const dbName = 'first';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

  // the following code examples can be pasted here...

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

const insertResult = await collection.insertOne({name:"sk", age:"22"});
console.log('Inserted documents =>', insertResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());