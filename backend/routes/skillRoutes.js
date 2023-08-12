import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import skillController from '../controllers/skillController.js';

const router = express.Router();

// New route to get all skill names with IDs
router.get('/all', verifyToken, skillController.getAllSkills);

//Get all skills record
router.get('/', verifyToken, skillController.getSkills)

//Get skills for a specific user
router.get('/user/:userId', verifyToken, skillController.getUserSkills);

// upsert skills for a specific user
router.put('/user/:userId', verifyToken, skillController.upsertUserSkills);


export default router;