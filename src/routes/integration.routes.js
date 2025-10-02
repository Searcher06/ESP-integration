import express from "express";
import {
  integrateEsp,
  getAllAudiences,
} from "../controllers/integrations.controller.js";

const router = express.Router();

router.post("/:esp", integrateEsp);
router.get("/:esp/lists", getAllAudiences);

export default router;
