const mongoose = require("mongoose");
const { Schema } = mongoose;

const trainingTypeSchema = new Schema(
    {
        type: { type: String, required: [true, 'Type of Training is required'] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Training Type", trainingTypeSchema);