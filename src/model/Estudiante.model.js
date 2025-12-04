import { Schema, model} from "mongoose";

const EstudianteSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    descripcion: { type: String, required: true },
    telefono: { type: String, required: true },
    grupo: { type: Schema.Types.ObjectId, ref: 'Grupo', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
});

export const Estudiante = model('Estudiante', EstudianteSchema);