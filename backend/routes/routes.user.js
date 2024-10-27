import { getAllUser,createUser,updateUser,deleteUser } from "../controller/controller.user.js";
import express from 'express';

const router = express.Router();

router.get("/", getAllUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router; // to index.js