import { signUp, login } from '../controller/controller.user.js';
import express from 'express';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/logIn', login);

export default router; // to index.js
