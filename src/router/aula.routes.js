import { Router } from "express";

import { getAllAulas, getAulaById, createAula, updateAula, deleteAula } from "../controller/aula.controller.js";
const router = Router();
router.get("/aulas", getAllAulas);
router.get("/aulas/:id", getAulaById);
router.post("/aulas", createAula);
router.put("/aulas/:id", updateAula);
router.delete("/aulas/:id", deleteAula);

export default router;