import express from 'express'
import { addComment, getAllComments } from '../controllers/commentController.js';

const router = express.Router();

router.post("/post/:postId", addComment);

router.get("/post/:postId", getAllComments);

export default router;