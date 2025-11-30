import { Schema } from "mongoose";

export const ProgramaSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    descripcion: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    programa: { type: Schema.Types.ObjectId, ref: "Programa", required: true }
});