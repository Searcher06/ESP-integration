import express from "express";
import {
  saveApiKey,
  getAllAudiences,
} from "../controllers/integrations.controller.js";

const router = express.Router();

router.post("/:esp", saveApiKey);
router.get("/:esp/lists", getAllAudiences);

export default router;
