import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment: {type:String, required: true},
    post: [{type: mongoose.Types.ObjectId, ref: "Post"}]
})

export default mongoose.model("Comment",commentSchema);