// define the routes w/o the separation of logics that is only foound in controlelr file
import express from "express";
import {
	getAllComment,
	createComment,
	updateComment,
	deleteComment,
} from "../controller/controller.comment.js";

const router = express.Router();

router.get("/", getAllComment);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router; // to index.js
