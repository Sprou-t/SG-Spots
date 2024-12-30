// import { getTIHData } from "../controller/controller.apiCall.js";
import express from 'express';
import {
	createAttraction,
	getAllAttractions,
	getAttractionById,
} from '../controller/controller.apiCall.js';

const router = express.Router();

router.get('/', getAllAttractions);
router.get('/:id', getAttractionById);
router.post('/', createAttraction);

export default router;
