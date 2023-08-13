import express from 'express';
import vacancyController from '../controllers/vacancyController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all vacancies
router.get('/', verifyToken, vacancyController.getAllVacancies);

// Get a single vacancy
router.get('/:id', verifyToken, vacancyController.getVacancy);

// Delete a vacancy
// router.delete('/:id', verifyToken, vacancyController.deleteVacancy);

// Update a vacancy
// router.put('/:id', verifyToken, vacancyController.updateVacancy);

// Create a new vacancy
// router.post('/create', verifyToken, vacancyController.createVacancy);

// Upsert a vacancy (can be used to update an existing vacancy or create a new one)
// If id is provided in params, it will update the vacancy with that id
// Otherwise, it will create a new vacancy
// router.post('/upsert/:id?', verifyToken, vacancyController.upsertVacancy);

export default router;
