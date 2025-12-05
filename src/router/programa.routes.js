import {Router} from 'express';
import {getAllProgramas, getProgramaById, createPrograma, updatePrograma, deletePrograma} from '../controller/programa.controller.js';

const router = Router();

router.get('/programas', getAllProgramas);  
router.get('/programas/:id', getProgramaById);
router.post('/programas', createPrograma);
router.put('/programas/:id', updatePrograma);
router.delete('/programas/:id', deletePrograma);

export default router;