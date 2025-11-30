import { Schema, model} from "mongoose";

const ProfesorSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    descripcion: { type: String, required: true },
    especialidad: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
});

export const Profesor = model('Profesor', ProfesorSchema);