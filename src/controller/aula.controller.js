import {Aula} from '../model/Aula.model.js';
// Obtener todas las aulas

export const getAllAulas = async (req, res) => {
    try {
        const aulas = await Aula.find();
        res.status(200).json(aulas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un aula por ID
export const getAulaById = async (req, res) => {
    try {
        const aula = await Aula.findById(req.params.id);
        if (!aula) {
            return res.status(404).json({ message: 'Aula no encontrada' });
        }
        res.status(200).json(aula);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva aula
export const createAula = async (req, res) => {
    try {
        const newAula = new Aula(req.body);
        const savedAula = await newAula.save();
        res.status(201).json(savedAula);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Actualizar un aula existente
export const updateAula = async (req, res) => {
    try {
        const updatedAula = await Aula.findByIdAndUpdate(req
.params.id, req.body, { new: true });
        if (!updatedAula) {
            return res.status(404).json({ message: 'Aula no encontrada' });
        }
        res.status(200).json(updatedAula);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Eliminar un aula
export const deleteAula = async (req, res) => {
    try {
        const deletedAula = await Aula.findByIdAndDelete(req.params.id);
        if (!deletedAula) {
            return res.status(404).json({ message: 'Aula no encontrada' });
        }
        res.status(200).json({ message: 'Aula eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
