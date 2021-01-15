const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordsSchema = new Schema(
  {
    firstname:{type:String, required:[true,'First Name is required']},
    lastname:{type:String,required:[true,'Last Name is required']},
    training:{type:String,required:[true,'Training is required']},
    trainingtype:{type:String,required:[true,'Trainingtype is required']},
    validfromdate: {type:Date},
    validtodate: {type:Date},
    name_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    training_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"training"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Records", recordsSchema);
