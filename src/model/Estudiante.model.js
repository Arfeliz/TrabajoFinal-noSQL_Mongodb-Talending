import { Schema, model} from "mongoose";

const EstudianteSchema = new Schema({
    grupo: { type: Schema.Types.ObjectId, ref: 'Grupo', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
});

export const Estudiante = model('Estudiante', EstudianteSchema);