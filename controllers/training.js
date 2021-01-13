const Training = require("../models/Training");

exports.list = async (req, res) => {
  try {
    console.log(req.query)
    const message = req.query.message;
    const training = await training.find({});
    res.render("training", { training: training, message: message });
  } catch (e) {
    res.status(404).send({ message: "could not list training" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {

    await training.findByIdAndRemove(id);
    res.redirect("/training");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};


exports.create = async (req, res) => {

  try {
    const training = new training({ 
        name: req.body.name, 
        provider: req.body.provider, 
        validfor : parseInt(req.body.validfor)
    });
    await training.save();
    res.redirect('/training/?message=a new training record has been created')
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render('create-training ', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const training = await training.findById(id);
    res.render('update-training', { taster: taster, id: id });
  } catch (e) {
    res.status(404).send({
      message: `could find training ${id}.`,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const training = await training.updateOne({ _id: id }, req.body);
    res.redirect('/training/?message=training has been updated');
  } catch (e) {
    res.status(404).send({
      message: `could find training ${id}.`,
    });
  }
};