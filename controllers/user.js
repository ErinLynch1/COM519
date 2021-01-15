const User = require('../models/User.js');


exports.list = async(req,res) => {

    try 
    {
    const user = User.find({});
    res.render("user",{user:user});

    }catch(e){
    res.status(404).send ({ message: "could not list user" });
    } 
};


exports.delete = async(req,res)=>{
    const id = req.params.id;
  try {
    await user.findByIdAndRemove(id);
    res.redirect("/user");
  } catch (e) {
    res.status(404).send({
      message: `could not delete user ${id}.`,
    });
  }
};


exports.create = async (req, res) => {

    try {
      const user = new User({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        jobtitle:req.body.jobtitle,
        email: req.body.email,
        password: req.body.password,
        typeofuser:req.body.typeofuser
      });
      await user.save();
      res.redirect('/user/?message=user has been created')
    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        res.render('create-user', { errors: e.errors })
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
      const user = await User.findById(id);
      res.render('update-user', { user: user, id: id });
    } catch (e) {
      res.status(404).send({
        message: `could find user ${id}.`,
      });
    }
  };
  
  exports.update = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.updateOne({ _id: id }, req.body);
      res.redirect('/user/?message=user has been updated');
    } catch (e) {
      res.status(404).send({
        message: `could find user ${id}.`,
      });
    }
  };