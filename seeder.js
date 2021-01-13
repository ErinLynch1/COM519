
const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");


const uri =  "mongodb://localhost:27017/training";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const training = await db.collection("training").find({}).count();
    const records = await db.collection("records").find({}).count();
    const users = await db.collection("user").find({}).count();
    const trainingtype = await db.collection("trainingtype").find({}).count();

    if (results) {
      db.dropDatabase();
    }

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
    const userdata = await fs.readFile(path.join(__dirname, "user.json"), "utf8");
    const trainingtypedata = await fs.readFile(path.join(__dirname, "trainingtype.json"), "utf8");

    await db.collection("training").insertMany(JSON.parse(trainingdata));
    await db.collection("records").insertMany(JSON.parse(recordsdata));
    await db.collection("user").insertMany(JSON.parse(userdata));
    await db.collection("trainingtype").insertMany(JSON.parse(trainingtypedata));

    /**
     * This perhaps appears a little more complex than it is. Below, we are
     * grouping the wine tasters and summing their total tastings. Finally,
     * we tidy up the output so it represents the format we need for our new collection
     */

    const wineTastersRef = await db.collection("tastings").aggregate([
      { $match: { taster_name: { $ne: null } } },
      {
        $group: {
          _id: "$taster_name",
          twitter: { $first: "$taster_twitter_handle" },
          tastings: { $sum: 1 },
        },

      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          twitter: '$twitter',
          tastings: '$tastings'
        },
      },
    ]);
    /**
     * Below, we output the results of our aggregate into a
     * new collection
     */
    const wineTasters = await wineTastersRef.toArray();
    await db.collection("tasters").insertMany(wineTasters);

    /** This data manipulation is to reference each document in the
     * tastings collection to a taster id. Further to this we also take the opportunity to
     * tidy up points (converting it to a int) and regions, adding them to a an array
     */

    const updatedUsersRef = db.collection("users").find({});
    const updatedUsers = await updatedUsersRef.toArray();
    updatedUsers.forEach(async ({ _id, name }) => {
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
