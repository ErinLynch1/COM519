const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstname: { type: String, required:[true,'firstname is required']},
        lastname:{type:String,required:[true,'lastname is required']},
        jobtitle:{type:String,required:[true,'jobtitle is required']},
        email: { type: String, required: [true, 'email is required'], unique: true },
        password: { type: String, required: [true, 'password is required'] },
        typeofuser:{type:String, required:[true,'type of user is required']}
    },
    { timestamps: true }
);


module.exports = mongoose.model("user", userSchema);