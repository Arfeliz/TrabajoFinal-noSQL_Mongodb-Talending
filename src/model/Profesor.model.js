import { Schema, model} from "mongoose";

const ProfesorSchema = new Schema({
    descripcion: { type: String, required: true },
    especialidad: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
});

export const Profesor = model('Profesor', ProfesorSchema);