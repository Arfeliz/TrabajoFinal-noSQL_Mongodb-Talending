
import { Router } from "express";
import {getAllProfesores, getProfesorById, createProfesor, deleteProfesor, updateProfesor,getProfesoresByGrupo,getProfesoresByPrograma} from "../controller/profesor.controller.js";
const router = Router();

router.get('/profesores', getAllProfesores);
router.get('/profesores/:id', getProfesorById);
router.get('/profesores/grupo/:grupoId', getProfesoresByGrupo);
router.get('/profesores/programa/:programaId', getProfesoresByPrograma);
router.post('/profesores', createProfesor);
router.put('/profesores/:id', updateProfesor);
router.delete('/profesores/:id', deleteProfesor);


export default router;