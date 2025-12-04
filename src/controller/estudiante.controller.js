import {Estudiante} from '../model/Estudiante.model.js';
import { promoteToEstudiante,promoteToInvitado } from './usuario.controller.js';

// Obtener todos los estudiantes
export const getAllEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find().populate('grupo').populate('usuario');
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

// Obtener estudiantes por grupo
export const getEstudiantesByGrupo = async (req, res) => {
    // 1. Obtener el ID del grupo de los parámetros de la URL
    const { idGrupo } = req.params;

    if (!idGrupo) {
        return res.status(400).json({ message: "Se requiere el ID del grupo para la búsqueda." });
    }

    try {
        // 2. Usar Estudiante.find() con un objeto de filtro
        const estudiantes = await Estudiante.find({ grupo: idGrupo })
            .populate('grupo') 
            .populate('usuario'); 

        // 3. Respuesta exitosa
        if (estudiantes.length === 0) {
            return res.status(404).json({ message: "No se encontraron estudiantes para este grupo." });
        }
        
        res.status(200).json(estudiantes);

    } catch (error) {
        // 4. Manejo de errores
        res.status(500).json({ 
            message: "Error al obtener estudiantes por grupo.", 
            details: error.message 
        });
    }
};

export const getEstudianteById = async (req, res) => {
    try {
        const estudiante = await Estudiante.findById(req.params.id).populate('grupo').populate('usuario'); 
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEstudiante = async (req, res) => {
    try {
        const newEstudiante = new Estudiante(req.body);
        const updatedEstudiante = await promoteToEstudiante(req.body.usuario);
        if (!updatedEstudiante) {
            return res.status(404).json({ message: 'No se pudo promover al usuario a estudiante' });
        }
        const savedEstudiante = await newEstudiante.save();
        res.status(201).json(savedEstudiante);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateEstudiante = async (req, res) => {
    try {
        const updatedEstudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEstudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(updatedEstudiante);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

export const deleteEstudiante = async (req, res) => {
    try {
        const deletedEstudiante = await Estudiante.findByIdAndDelete(req.params.id);
        if (!deletedEstudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        promoteToInvitado(deletedEstudiante.usuario);
        res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};