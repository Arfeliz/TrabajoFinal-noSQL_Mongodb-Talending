import { Schema } from "mongoose";

export const ProgramaSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    costo: { type: Number, required: true },
    typePago: { type: String, required: true },
    duracion: { type: String, required: true },
    modalidad: { type: String, required: true },
    tipo: { type: String, enum:['curso','diplomado','capacitación'], required: true }
});

