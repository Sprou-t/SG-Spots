// define the routes w/o the separation of logics that is only foound in controlelr file
import express from 'express';
import { getTIHData } from '../controller/controller.TIH.js';

const router = express.Router();

router.get('/', getTIHData);

export default router; // to index.js
