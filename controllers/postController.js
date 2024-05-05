import Post from "../models/Post.js";
import User from "../models/User.js"
import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import Category from "../models/Category.js";


// export const addPost = async (req, res) => {

//     try {
//         const { title, content, category } = req.body;

//         if (!req.file) {
//             return res.status(400).json({ error: 'Thumbnail is required' });
//         }

//         const thumbnail = req.files;

//         const newPost = new Post({
//             title,
//             content,
//             category,
//             thumbnail,
//             creator: req.user.id
//         });
//         await newPost.save();
//         // res.status(200).json({ success: true, message: "Post Created Syccessfully !!" });

//         // FIND USER AND INCREASE POST COUNT BY 1

//         const currentUser = await User.findById(req.user.id);
//         currentUser.posts.push(newPost);
//         await currentUser.save();
//         // const postCount = currentUser.posts + 1;
//         // await User.findByIdAndUpdate(req.user.id, { posts: postCount })
//         res.status(200).json({ success: true, message: "Post Successfully Created", data: newPost });

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ successs: false, message: 'Internal Server Error' });

//     }
// }

export const addPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        console.log(req.body);

        console.log('Received categoryName:', category);


        if (!req.file) {
            return res.status(400).json({ error: 'Thumbnail is required' });
        }

        const thumbnail = req.file.filename;

        // const categoryId = await Category.findById( category );

        const categoryId = await Category.findOne({ categoryName: category});


        console.log("CATEGORY ID====>"+categoryId);

        if (!categoryId) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        const newPost = new Post({
            title,
            content,
            category: categoryId,
            thumbnail,
            creator: req.user.id
        });

        await newPost.save();

        // FIND USER AND INCREASE POST COUNT BY 1
        console.log(req.user.id);
        const currentUser = await User.findById({ _id: req.user.id });
        // console.log(currentUser);

        if (!currentUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        currentUser.posts.push(newPost);
        await currentUser.save();


        res.status(200).json({ success: true, message: "Post Successfully Created",data: newPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("category");

        const formattedPosts = posts.map(post => ({
            _id: post._id,
            title: post.title,
            content: post.content,
            category: {
                _id: post.category._id,
                categoryName: post.category.categoryName,
                description: post.category.description
            },
            creator: post.creator,
            thumbnail: post.thumbnail,
            comments: post.comments,
            postDate: post.postDate
        }));
        res.status(200).json({ success: true, message: "Post Found", data: formattedPosts });
    } catch (err) {
        res.status(404).json({ success: false, message: "Posts Not Found" });
    }
}

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });

    }

}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletePost = await Post.findByIdAndDelete(postId);

        if (!deletePost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, message: 'Post Successfully Deleted !!' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, description, category } = req.body;
        // const thumbnail = req.file.path;

        // Find the post by its ID and update its fields
        const updatedPost = await Post.findByIdAndUpdate(postId, {
            title,
            description,
            category,
            // thumbnail
        }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, data: updatedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

export const getPostByUser=async(req,res)=>{
    try {
        const userId = req.params.userId;

        // Retrieve posts created by the specified user
        const posts = await Post.find({ creator: userId });

        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

export const getPostByCategory=async(req,res)=>{
    try{
        const category = req.params.category.split(',').map(cat => decodeURIComponent(cat));

        const posts = await Post.find({ category });
        res.status(200).json({ success: true, data: posts });
    }catch(err){
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}