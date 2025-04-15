import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error("Env value not found.");
}

const client = new MongoClient(mongoUri);
await client.connect();

const usersCollection = client.db().collection("users");
const productCollection = client.db().collection("products");
const agendaCollection = client.db().collection("agendas");

export { usersCollection, agendaCollection };