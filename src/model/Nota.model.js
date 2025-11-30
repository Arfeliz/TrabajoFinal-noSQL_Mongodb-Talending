
import { Schema, model } from "mongoose";

const NotaSchema = new Schema({
    estudiante: { type: Schema.Types.ObjectId, ref: 'Estudiante', required: true },
    programa: { type: Schema.Types.ObjectId, ref: 'Programa', required: true },
    nota: { type: Number, required: true },
});

export const Nota = model('Nota', NotaSchema);