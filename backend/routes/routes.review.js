// define the routes w/o the separation of logics that is only foound in controlelr file
import express from "express";
import {
	getAllReview,
	createReview,
	updateReview,
	deleteReview,
} from "../controller/controller.review.js";

const router = express.Router();

router.get("/", getAllReview);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router; // to index.js
