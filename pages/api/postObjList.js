import clientPromise from "../../lib/mongodb";
export default async (req, res) => {
  const client = await clientPromise;
  const database = client.db("Nutshell");
  const userdb = await database.collection("PostObjList").find({}).toArray();
  res.json(userdb);
};
