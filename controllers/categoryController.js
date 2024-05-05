import Category from "../models/Category.js"


export const addCategory = async(req,res)=>{

    const newCategory = new Category(req.body);

    try{
        const savedCategory = await newCategory.save();
        res.status(200).json({success: true, message: "Category Successfully Created", data: savedCategory});
    }catch(err){
        res.status(500).json({success: false, message: "Failed to Create Category. Try again"});
    }
}

export const getAllCategories = async(req,res)=>{
    try{
        const category = await Category.find({});
        res.status(200).json({success: true, message: "Categories FOund", data: category});
    }catch(err){
        res.status(404).json({success: false, message: "Categories Not Found"});
    }
}

