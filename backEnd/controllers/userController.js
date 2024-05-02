import User from "../models/User.js";

// CREATE NEW USER
export const createUser = async(req, res)=>{
    const newUser = new User(req.body);
    try{
        const savedUser = await newUser.save();
        res.status(200).json({success: true, message: "Successfully Created", data: savedUser});
    }catch(err){
        res.status(500).json({success: false, message: "Failed to Create. Try again"});
    }
};


// UPDATE USER
export const updateUser = async(req,res)=>{
    const id = req.params.id;
    try{
        const updateUser = await User.findByIdAndUpdate(id,{$set: req.body},{new: true});
        res.status(200).json({success: true, message: "Successfully Updated", data: updateUser});
    }catch(err){
        res.status(500).json({success: false, message: "Failed to Update. Try again"});
    }
};


// DELETE USER
export const deleteUser = async(req,res)=>{
    const id = req.params.id;
    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Successfully Deleted"});
    }catch(err){
        res.status(500).json({success: false, message: "Failed to Delete. Try again"});
    }
};


// GET SINGLE USER
export const getUserById = async(req,res)=>{
    const id = req.params.id;
    try{
        const getSingleUser = await User.findById(id);
        res.status(200).json({success: true, message: "Successfully Get the Tour Details of specific ID", data: getSingleUser});
    }catch(err){
        res.status(404).json({success: false, message: "Not Found"});
    }
};


// GET ALL USERS
export const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({success: true, message: "Successfully", data: users});
    }catch(err){
        res.status(404).json({success: false, message: "Not Found"});
    }
};
