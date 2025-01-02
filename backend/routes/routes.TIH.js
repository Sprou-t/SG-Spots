// define the routes w/o the separation of logics that is only foound in controlelr file
import express from 'express';
import { getTihData } from '../controller/controller.tih.js';
const router = express.Router();

router.post("/", getTihData)
export default router; // to index.js
