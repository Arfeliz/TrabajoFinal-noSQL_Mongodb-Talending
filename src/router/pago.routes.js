import express from 'express';
import { 
    getPagosByFecha, // Nueva función
    getCobrosAgrupadosPorFecha, // Nueva función
    getDeudaTotalByGrupo, // Nueva función
    getDetalleDeudaByGrupo // Nueva función
} from '../controllers/reporte.controller.js'; // Asegúrate de que la ruta de importación es correcta

const router = express.Router();
// --- REPORTES DE PAGOS Y DEUDA ---

// 4. REPORTE: Listado de cobros realizados en una fecha específica (por query param)
// Ejemplo de uso: GET /api/reportes/pagos/fecha?date=2025-12-01
router.get('/pagos/fecha', getPagosByFecha);

// 5. REPORTE: Listado de cobros agrupados por fecha (Aggregation)
// Ejemplo de uso: GET /api/reportes/pagos/agrupados
router.get('/pagos/agrupados', getCobrosAgrupadosPorFecha);

// 6. REPORTE: Deuda total de un grupo (Aggregation)
// Ejemplo de uso: GET /api/reportes/deuda/grupo/:grupoId
router.get('/deuda/grupo/:grupoId', getDeudaTotalByGrupo);

// 7. REPORTE: Detalle de deuda por estudiante en un grupo (Aggregation + Populate)
// Ejemplo de uso: GET /api/reportes/deuda/detalle/:grupoId
router.get('/deuda/detalle/:grupoId', getDetalleDeudaByGrupo);


export default router;