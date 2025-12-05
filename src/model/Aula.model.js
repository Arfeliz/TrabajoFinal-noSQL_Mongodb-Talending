import { Schema, model} from "mongoose";

const AulaSchema = new Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true },
    ubicacion: { type: String, required: true },
    capacidad: { type: Number, required: true },
});

export const Aula = model('Aula', AulaSchema);

