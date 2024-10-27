// define the routes w/o the separation of logics that is only foound in controlelr file
import express from "express";
import {
	getAllItenary,
	createItenary,
	updateItenary,
	deleteItenary,
} from "../controller/controller.itenary.js";

const router = express.Router();

router.get("/", getAllItenary);
router.post("/", createItenary);
router.put("/:id", updateItenary);
router.delete("/:id", deleteItenary);

export default router; // to index.js
