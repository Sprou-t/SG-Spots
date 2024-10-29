import { getTIHData } from "../controller/controller.apiCall.js";
import express from "express";

const router = express.Router();

router.get("/", getTIHData);

export default router;
