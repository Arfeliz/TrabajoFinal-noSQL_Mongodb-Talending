import {Grupo} from '../model/Grupo.model.js';

export const getAllGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.find();
        res.status(200).json(grupos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getGrupoById = async (req, res) => {
    try {
        const grupoById = await Grupo.findById(req.params.id);
        if (!grupoById) {
            return res.status(404).json({ message: 'Grupo no encontrado' });
        }
        res.status(200).json(grupoById);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createGrupo = async (req, res) => {
    try {
        const newGrupo = new Grupo(req.body);
        const savedGrupo = await newGrupo.save();
        res.status(201).json(savedGrupo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateGrupo = async (req, res) => {
    try {
        const updatedGrupo = await Grupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGrupo) {
            return res.status(404).json({ message: 'Grupo no encontrado' });
        }
        res.status(200).json(updatedGrupo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteGrupo = async (req, res) => {
    try {
        const deletedGrupo = await Grupo.findByIdAndDelete(req.params.id);
        if (!deletedGrupo) {
            return res.status(404).json({ message: 'Grupo no encontrado' });
        }
        res.status(200).json({ message: 'Grupo eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};