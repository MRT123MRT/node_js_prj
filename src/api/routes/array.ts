import express, { Router } from 'express';
import isAdmin from '../middleware/isAdmin';
import isUser from '../middleware/isUser';
import * as arrayController from '../controllers/arrayController';

export const router: Router = express.Router();


// GET /array
router.get('/', isUser, arrayController.getArray);

// GET /array/:index
router.get('/:index', isUser, arrayController.getArrayIndex);

// POST /array
router.post('/', isUser, isAdmin, arrayController.postArray);

// PUT /array/:index
router.put('/:index', isUser, isAdmin, arrayController.putArrayIndex);

// DELETE /array
router.delete('/', isUser, isAdmin, arrayController.deleteArray);

// DELETE /array/:index
router.delete('/:index', isUser, isAdmin, arrayController.deleteArrayIndex);