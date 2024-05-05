import Comments from "../models/Comments.js";
import Post from "../models/Post.js";

export const addComment=async(req,res)=>{
    try {
        const postId = req.params.postId;
        const { comment } = req.body;

        // Create a new comment
        const newComment = new Comments({ comment, post: postId });
        await newComment.save();

        // Add the comment to the post's comments array
        const post = await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } }, { new: true });

        res.status(201).json({ success: true, data: newComment, post: post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}


export const getAllComments=async(req, res)=>{
    try {
        const postId = req.params.postId;

        // Retrieve all comments for the specified post
        const comments = await Comments.find({ post: postId });

        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}