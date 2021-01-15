const Records = require("../models/Records");

exports.list = async(req,res) => {

try {
    const records = Records.find({});
    res.render("records",{records:records});

    }catch(e){
    res.status(404).send ({ message: "could not list records" });
    } 
};


exports.delete = async(req,res)=>{
    const id = req.params.id;
  try {
    await Records.findByIdAndRemove(id);
    res.redirect("/records");
  } catch (e) {
    res.status(404).send({
      message: `could not delete record ${id}.`,
    });
  }
};


exports.create = async (req, res) => {

    try {
      const records = new Records({ 
        name: req.body.name, 
        training: req.body.training, 
        validfromdate:req.body.validfromdate, 
        validtodate:req.body.validtodate
      });
      await records.save();
      res.redirect('/records/?message=record has been created')
    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        res.render('create-record', { errors: e.errors })
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
      const records = await Records.findById(id);
      res.render('update-records', { records: records, id: id });
    } catch (e) {
      res.status(404).send({
        message: `could find record ${id}.`,
      });
    }
  };
  
  exports.update = async (req, res) => {
    const id = req.params.id;
    try {
      const records = await Records.updateOne({ _id: id }, req.body);
      res.redirect('/records/?message=record has been updated');
    } catch (e) {
      res.status(404).send({
        message: `could find record ${id}.`,
      });
    }
  };