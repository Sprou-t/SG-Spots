// define the routes w/o the separation of logics that is only foound in controlelr file
import express from "express";
import mongoose from "mongoose";
import {
	getItenary,
	createItenary,
	updateItenary,
	deleteItenary,
} from "../controller/controller.itenary.js";
const router = express.Router();

router.get("/", getItenary);
router.post("/", createItenary);
router.put("/:id", updateItenary);
router.delete("/:id", deleteItenary);

export default router;
