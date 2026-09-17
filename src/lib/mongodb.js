import { MongoClient } from "mongodb";

const options = {};

function createClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options).connect();
    }
    return global._mongoClientPromise;
  }

  return new MongoClient(uri, options).connect();
}

let clientPromise;

export default function getMongoClient() {
  if (!clientPromise) {
    clientPromise = createClientPromise();
  }
  return clientPromise;
}
