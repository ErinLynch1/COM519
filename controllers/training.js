const training = require("../models/Training");

exports.list = async(req,res) => {

    try 
    {
    const training = training.find({});
    res.render("training",{training:training});

    }catch(e){
    res.status(404).send ({ message: "could not list Training" });
    } 
};


exports.delete = async(req,res)=>{
    const id = req.params.id;
  try {
    await training.findByIdAndRemove(id);
    res.redirect("/training");
  } catch (e) {
    res.status(404).send({
      message: `could not delete record ${id}.`,
    });
  }
};


exports.create = async (req, res) => {

    try {
      const trainingtype = await trainingtype.findById(req.body.trainingtype_id)
      await training.create({ 
        trainingname:req.body.trainingname,
        provider:req.body.provider,
        trainingtype: req.body.trainingtype,
        validforyear:req.body.validforyear,
        validformonth:req.body.validformonth
      })
      res.redirect('/training/?message=training record has been created')
    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        res.render('create-training', { errors: e.errors })
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
      const training = await Training.findById(id);
      res.render('update-training', { training: training, id: id });
    } catch (e) {
      res.status(404).send({
        message: `could find training ${id}.`,
      });
    }
  };
  
  exports.update = async (req, res) => {
    const id = req.params.id;
    try {
      const training = await Training.updateOne({ _id: id }, req.body);
      res.redirect('/training/?message=training has been updated');
    } catch (e) {
      res.status(404).send({
        message: `could find training ${id}.`,
      });
    }
  };