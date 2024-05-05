import express from 'express'
import { addPost,getAllPost,getPostById,deletePost,updatePost, getPostByUser, getPostByCategory } from '../controllers/postController.js';
import multer from 'multer';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/images")
    },
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/addPost',upload.single('thumbnail'),verifyToken,addPost);

router.get('/', getAllPost);

router.get('/:id', getPostById);

router.delete('/:id', deletePost);

router.put('/:id',verifyUser, updatePost);

router.get('/user/:userId', getPostByUser);

router.get('/category/:category', getPostByCategory);



export default router;