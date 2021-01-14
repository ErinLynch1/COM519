const Training = require("../models/training");
const User = require("../models/user");
const bodyParser = require("body-parser");
const { findById } = require("../models/User");
const records = require("../models/records");


exports.list = async (req, res) => {
  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;


  try {
    const records = await records.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await records.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);

    res.render("records", {
      records: records,
      numberOfPages: numberOfPages,
      currentPage: page,
      message: message
    });
  } catch (e) {
    res.status(404).send({ message: "could not list any records" });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await user.find({});
    const training = await traing.findById(id);
    if (!record) throw Error('cant find record');
    res.render('update-record', {
      user: user,
      training: training,
      id: id,
      errors: {}
    });
  } catch (e) {
    console.log(e)
    if (e.errors) {
      res.render('create-record', { errors: e.errors })
      return;
    }
    res.status(404).send({
      message: `could find taster ${id}`,
    });
  }
};

exports.create = async (req, res) => {
  try {

    const user = await user.findById(req.body.user_id);
    await Tasting.create({
      title: req.body.title,
      user_firstname: user.firstname,
      user_lastname: user.lastname,
      user_email: user.email,
      user_id: req.body.user_id,
    })

    res.redirect('/records/?message=a record has been created')
  } catch (e) {
    if (e.errors) {
      res.render('create-record', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}

exports.createView = async (req, res) => {
  try {
    const user = await user.find({});
    res.render("create-tasting", {
      user: user,
      errors: {}
    });

  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await records.findByIdAndRemove(id);
    res.redirect("/records");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};

