import express from 'express';
import { 
    getCursosYNotasByEstudiante,
    getNotasByPrograma 
} from '../controllers/reporte.controller.js'; // Asegúrate de que la ruta de importación es correcta

const router = express.Router();

// 1. REPORTE: Cursos y notas que un estudiante ha tomado por ID de Estudiante
// Ejemplo de uso: GET /api/reportes/cursos/estudiante/60c72b21f3a54b0015b6d173
router.get('/notas/cursos-estudiante/:estudianteId', getCursosYNotasByEstudiante);

// 2. REPORTE: Listado de notas de un grupo (por ID de Programa)
// Ejemplo de uso: GET /api/reportes/notas/programa/60c72a65f3a54b0015b6d160
router.get('/notas/programa/:programaId', getNotasByPrograma);

export default router;