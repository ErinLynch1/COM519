require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const Training = require("./models/Training")


const trainingCon = require('./controllers/training');
const recordsCon= require('./controllers/records');
const userCon = require('./controllers/user');

const app = express();
app.set("view engine", "ejs");

const { PORT, MONGODB_URI } = process.env;


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ 
  secret: 'foo barr', 
  cookie: { expires: new Date(253402300000000) },
}))


app.get("/create-training", authMiddleware, (req, res) => {
  res.render("create-training", { errors: {} });
});

app.post("/create-training", trainingCon.create);

app.get("/training", trainingCon.list);
app.get("/training/delete/:id", trainingCon.delete);
app.get("/training/update/:id", trainingCon.edit);
app.post("/training/update/:id", trainingCon.update);


app.get("/create-records", authMiddleware, (req, res) => {
  res.render("create-records", { errors: {} });
});

app.post("/create-records", recordsCon.create);

app.get("/records", recordsCon.list);
app.get("/records/delete/:id", recordsCon.delete);
app.get("/records/update/:id", recordsCon.edit);
app.post("/records/update/:id", recordsCon.update);

app.get("/create-user", authMiddleware, (req, res) => {
  res.render("create-user", { errors: {} });
});

app.post("/create-user", userCon.create);

app.get("/records", userCon.list);
app.get("/records/delete/:id", userCon.delete);
app.get("/records/update/:id", userCon.edit);
app.post("/records/update/:id", userCon.update);

app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});
