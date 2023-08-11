import express from 'express';
import projectController from '../controllers/projectController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

//Get all projects
router.get('/', verifyToken, projectController.getAllProjects)

//GET a single project
router.get('/:id', verifyToken, projectController.getProject)

//DELETE a project
router.delete('/:id', verifyToken, projectController.deleteProject)

//UPDATE a project
router.put('/:id', verifyToken, projectController.updateProject)

//CREATE a new project
router.post('/create', projectController.createProject)

export default router;