// define the routes w/o the separation of logics that is only foound in controlelr file
import express from 'express';
import { uploadTihDataToMongoAndS3, retrieveTihDataFromMongoAndS3, testExtractSingleImgFromS3 } from '../controller/controller.tih.js';
const router = express.Router();

router.post("/", uploadTihDataToMongoAndS3)
router.get("/", retrieveTihDataFromMongoAndS3)
// router.get("/", testExtractSingleImgFromS3)
export default router; // to index.js
