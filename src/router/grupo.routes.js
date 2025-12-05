import {Router} from 'express';
import { getAllGrupos, getGrupoById, createGrupo, updateGrupo, deleteGrupo } from '../controller/grupo.controller.js';

const router = Router();

router.get('/grupos', getAllGrupos);
router.get('/grupos/:id', getGrupoById);
router.post('/grupos', createGrupo);
router.put('/grupos/:id', updateGrupo);
router.delete('/grupos/:id', deleteGrupo);

export default router;