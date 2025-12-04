import { Usuario } from "../model/Usuario.model.js";

// Obtener todos los usuarios
export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    try {
        const newUsuario = new Usuario(req.body);
        const savedUsuario = await newUsuario.save();
        res.status(201).json(savedUsuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Actualizar un usuario existente
export const updateUsuario = async (req, res) => {
    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id
, req.body, { new: true });
        if (!updatedUsuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }   
        res.status(200).json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        const deletedUsuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!deletedUsuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//actualizar a profesor
export const promoteToProfesor = async (id) => {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
           const error = new Error('Usuario no encontrado');
            error.status = 404;
            throw error;
        }
        usuario.rol = 'profesor';
        const updatedUsuario = await usuario.save();
        return updatedUsuario;
    } catch (error) {
        throw error;
    }
};

//actualizar a estudiante  
export const promoteToEstudiante = async (id) => {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            throw error;
        }
        usuario.rol = 'estudiante';
        const updatedUsuario = await usuario.save();
        return updatedUsuario;
    } catch (error) {
        throw error;
    }
};
    //actualizar a estudiante  
export const promoteToInvitado = async (id) => {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            throw error;
        }
        usuario.rol = 'invitado';
        const updatedUsuario = await usuario.save();
        return updatedUsuario;
    } catch (error) {
         throw error;
    }
};
