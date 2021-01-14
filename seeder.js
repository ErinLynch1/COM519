
const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");


const uri =  "mongodb+srv://Admin:CapbJKtG6tXloAp@records.ov9yy.mongodb.net/Training?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const training = await db.collection("training").find({}).count();
    const records = await db.collection("records").find({}).count();
    const users = await db.collection("user").find({}).count();
    const trainingtype = await db.collection("trainingtype").find({}).count();

    /*if (training) {
      db.dropDatabase();
    }*/

    /**
     * This is just a fun little loader module that displays a spinner
     * to the command line
     */
    const load = loading("importing the training records").start();

    /**
     * Import the JSON data into the database
     */

    const trainingdata = await fs.readFile(path.join(__dirname, "training.json"), "utf8");
    const recordsdata = await fs.readFile(path.join(__dirname, "records.json"), "utf8");
    const userdata = await fs.readFile(path.join(__dirname, "users.json"), "utf8");
    const trainingtypedata = await fs.readFile(path.join(__dirname, "trainingtype.json"), "utf8");

    await db.collection("training").insertMany(JSON.parse(trainingdata));
    await db.collection("records").insertMany(JSON.parse(recordsdata));
    await db.collection("user").insertMany(JSON.parse(userdata));
    await db.collection("trainingtype").insertMany(JSON.parse(trainingtypedata));


    const updatedusersRef = db.collection("users").find({});
    const updatedsers = await updatedusersRef.toArray();
    updatedusers.forEach(async ({ _id, name }) => {
      await db.collection("records").updateMany({ user_name: name }, [
        {
          $set: {
            user_id: _id,
            user_name: ["$firstname", "$lastname"],
          },
        },
      ]);
    });


    /**
     * we can get rid of region_1/2 off our root document, since we've
     * placed them in an array
     */
    await db
      .collection("users")
      .updateMany({}, { $unset: { firstname: "", lastname: " " } });

    load.stop();
    console.info(
      `Training data updated`
    );


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
