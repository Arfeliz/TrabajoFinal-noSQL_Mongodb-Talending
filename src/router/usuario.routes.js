import { Router } from "express";
import {getAllUsuarios,getUsuarioById,deleteUsuario, createUsuario, updateUsuario, promoteToInvitado} from "../controller/usuario.controller.js";

const router = Router();
// Ruta para obtener todos los usuarios
router.get('/usuarios', getAllUsuarios);
// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', getUsuarioById);
// Ruta para crear un nuevo usuario
router.post('/usuarios', createUsuario); 
// Ruta para actualizar un usuario existente
router.put('/usuarios/:id', updateUsuario);
// Ruta para eliminar un usuario
router.delete('/usuarios/:id', deleteUsuario);
//volver a rol invitado 
router.put('/usuarios/invitado/:id', promoteToInvitado);


export default router;