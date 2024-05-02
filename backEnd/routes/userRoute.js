import express from 'express';
import { createUser, getAllUsers, getUserById, deleteUser, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/register', createUser);

router.put('/:id', verifyUser, updateUser);

router.get('/:id', verifyUser, getUserById);

router.delete('/:id', verifyUser, deleteUser);

router.get('/', verifyAdmin, getAllUsers);



export default router;