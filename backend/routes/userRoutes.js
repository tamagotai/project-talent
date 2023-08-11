import express from 'express';
import userController from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

//Get all users
router.get('/', verifyToken, userController.getUsers)

//GET a single page
router.get('/:id', verifyToken, userController.getUser)

//DELETE a user
router.delete('/:id', verifyToken, userController.deleteUser)

//UPDATE a user
router.put('/:id', verifyToken, userController.updateUser)

//register
router.post('/register', userController.createUser)

//login
router.post('/login', userController.login)

//logout
router.post('/logout', userController.logout)

export default router;