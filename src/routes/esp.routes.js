import express from "express";
import { saveApiKey, getAllAudiences } from "../controllers/esp.controllers.js";

const router = express.Router();

router.post("/:esp", saveApiKey);
router.get("/:esp/lists", getAllAudiences);

export default router;
