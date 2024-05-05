import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category", required: true }, // Define category as an array of strings
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    thumbnail: { type: String },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }], // Reference to the Comment model
    postDate: { type: Date, default: Date.now } // Set default value to current date

});

export default mongoose.model("Post", postSchema);