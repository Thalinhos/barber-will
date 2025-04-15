import { ObjectId } from "mongodb";
import { usersCollection } from "../models/db.mjs";

export async function findAllUsers() {
  return await usersCollection.find({}).toArray();
}

export async function findUserById(id) {
  return await usersCollection.findOne({ _id: ObjectId.createFromHexString(id) });
}

export async function findUserByEmail(email) {
  return await usersCollection.findOne({ email });
}

export async function createUser(userData) {
  const result = await usersCollection.insertOne(userData);
  return result.insertedId; // dependendo da versão do driver
}

export async function updateUser(id, updateData) {
  const result = await usersCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(id) },
    { $set: updateData },
    { returnDocument: "after" } // ou `returnOriginal: false` em drivers antigos
  );
  return result;
}

export async function deleteUser(id) {
  const result = await usersCollection.deleteOne({ _id: ObjectId.createFromHexString(id) });
  return result.deletedCount > 0;
}


