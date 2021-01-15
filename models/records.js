const mongoose = require("mongoose");
const trainingtype = require("./trainingtype");
const { Schema } = mongoose;

const recordsSchema = new Schema(
  {
    name:{type:String, required:[true,'Name is required']},
    training:{type:String,required:[true,'Training is required']},
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
