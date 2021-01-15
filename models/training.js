const mongoose = require("mongoose");
const trainingtype = require("./Trainingtype");
const { Schema } = mongoose;

const trainingSchema = new Schema(
  {
    trainingname:{type:String, required:[true,'Training Name is required']},
    provider:String,
    trainingtype:String, 
    validforyear:{type:Number,default:0},
    validformonth:{type:Number,default:0},

    trainingtype_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Training Type"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", trainingSchema);
