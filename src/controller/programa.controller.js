import { Programa } from "../model/Programa.model.js";

// Obtener todos los programas
export const getAllProgramas = async (req, res) => {
    try {
        const programas = await Programa.find();
        res.status(200).json(programas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un programa por ID
export const getProgramaById = async (req, res) => {
    try {
        const programa = await Programa.findById(req.params.id);
        if (!programa) {
            return res.status(404).json({ message: 'Programa no encontrado' });
        }
        res.status(200).json(programa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo programa
export const createPrograma = async (req, res) => {
    try {
        const newPrograma = new Programa(req.body);
        const savedPrograma = await newPrograma.save();
        res.status(201).json(savedPrograma);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un programa existente
export const updatePrograma = async (req, res) => {
    try {
        const updatedPrograma = await Programa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPrograma) {
            return res.status(404).json({ message: 'Programa no encontrado' });
        }
        res.status(200).json(updatedPrograma);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un programa
export const deletePrograma = async (req, res) => {
    try {
        const deletedPrograma = await Programa.findByIdAndDelete(req.params.id);
        if (!deletedPrograma) {
            return res.status(404).json({ message: 'Programa no encontrado' });
        }
        res.status(200).json({ message: 'Programa eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
