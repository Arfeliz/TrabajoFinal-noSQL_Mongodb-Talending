import { Router } from 'express';
import { getAllEstudiantes, getEstudianteById,getEstudiantesByGrupo, createEstudiante, updateEstudiante, deleteEstudiante } from '../controller/estudiante.controller.js';

const router = Router();

router.get('/estudiantes', getAllEstudiantes);
router.get('/estudiantes/:id', getEstudianteById);
router.get('/estudiantes/grupo/:grupoId', getEstudiantesByGrupo);
router.post('/estudiantes', createEstudiante);
router.put('/estudiantes/:id', updateEstudiante);
router.delete('/estudiantes/:id', deleteEstudiante);

export default router;