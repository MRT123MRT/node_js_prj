import express, { Router } from 'express';
import isAdmin from '../middleware/isAdmin';
import isUser from '../middleware/isUser';


const userController = require('../controllers/userController');
export const router: Router = express.Router();

// POST /register
router.post('/register', userController.post_register);

// post /login
router.post('/login', userController.post_login);

// get /
router.get('/',isUser, userController.get_);

// get /getUser
router.get('/getUser',isUser, userController.get_getUser);

// get /getecho
router.get('/echo',isUser, userController.getEcho);
