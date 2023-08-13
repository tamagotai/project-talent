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

// Upsert a project (can be used to update an existing project or create a new one)
// If id is provided in params, it will update the project with that id
// Otherwise, it will create a new project
router.post('/upsert/:id?', verifyToken, projectController.upsertProject)

export default router;