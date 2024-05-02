import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    posts: [{type: String}],
    role: {type: String, default: 'user'}

});

export default mongoose.model("User", userSchema)