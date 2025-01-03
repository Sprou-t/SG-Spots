// define the routes w/o the separation of logics that is only foound in controlelr file
import express from 'express';
import { getAndUploadTihData } from '../controller/controller.tih.js';
const router = express.Router();

router.post("/", getAndUploadTihData)
// router.get("/", uploadTihImage)
export default router; // to index.js
