import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

//Get all users
router.get('/', userController.getUsers)

//GET a single page
router.get('/:id', userController.getUser)

//POST a new user
router.post('/', userController.createUser)

//DELETE a user
router.delete('/:id', userController.deleteUser)

//UPDATE a user
router.patch('/:id', userController.updateUser)

export default router;