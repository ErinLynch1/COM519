const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        firstname: { type: String, required:[true,'firstname is required']},
        lastname:{type:String,required:[true,'lastname is required']},
        DOB:{type:Number,required:[true,'DOB is required']}, 
        jobtitle:{type:String,required:[true,'jobtitle is required']},
        email: { type: String, required: [true, 'email is required'], unique: true },
        password: { type: String, required: [true, 'password is required'] },
        typeofuser:{type:String, required:[true,'type of user is required']}
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    console.log(this.password);
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e) {
        throw Error('could not hash password');
    }
})

module.exports = mongoose.model("user", userSchema);