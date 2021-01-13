const mongoose = require("mongoose");
const trainingtype = require("./trainingtype");
const { Schema } = mongoose;

const recordsSchema = new Schema(
  {
    name:{type:String, required:[true,'Name is required']},
    training:{type:String,required:[true,'Training is required']},
    validfromdate:{type:Date,default:0},
    validtodate:{type:Date,default:0},
    name_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    training_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Training"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Records", recordsSchema);
