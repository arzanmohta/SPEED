// utils/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Set in your .env file
let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env");
}

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db("SPEED"); // Use your database name here
  return { db, client };
}
