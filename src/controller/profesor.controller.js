import {Profesor} from '../model/Profesor.model.js';
import { promoteToProfesor,promoteToInvitado } from './usuario.controller.js';

// Obtener todos los profesores
export const getAllProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.find().populate('usuario');
        res.status(200).json(profesores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un profesor por ID
export const getProfesorById = async (req, res) => {
    try {   
        const profesor = await Profesor.findById(req.params.id).populate('usuario');
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(200).json(profesor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo profesor
export const createProfesor = async (req, res) => {
    try {
        const newProfesor = new Profesor(req.body);
        const updatedProfesor = await promoteToProfesor(req.body.usuario,);
        if (!updatedProfesor) {
            return res.status(404).json({ message: 'No se pudo promover al usuario a profesor' });
        }
        const savedProfesor = await newProfesor.save();
        res.status(201).json(savedProfesor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un profesor existente
export const updateProfesor = async (req, res) => {
    try {
        const updatedProfesor = await Profesor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }   
        res.status(200).json(updatedProfesor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un profesor
export const deleteProfesor = async (req, res) => {
    try {
        const deletedProfesor = await Profesor.findByIdAndDelete(req.params.id);
        if (!deletedProfesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        promoteToInvitado(deletedProfesor.usuario);
        res.status(200).json({ message: 'Profesor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};