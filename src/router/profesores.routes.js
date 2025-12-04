
import { Router } from "express";
import {getAllProfesores, getProfesorById, createProfesor, deleteProfesor, updateProfesor} from "../controller/profesor.controller.js";
const router = Router();
// Ruta para obtener todos los profesores
router.get('/profesores', getAllProfesores);
// Ruta para obtener un profesor por ID
router.get('/profesores/:id', getProfesorById);
// Ruta para crear un nuevo profesor
router.post('/profesores', createProfesor);
// Ruta para actualizar un profesor existente
router.put('/profesores/:id', updateProfesor);
// Ruta para eliminar un profesor
router.delete('/profesores/:id', deleteProfesor);

export default router;