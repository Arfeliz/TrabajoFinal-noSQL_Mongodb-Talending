import { Schema, model} from "mongoose";

const GrupoSchema = new Schema({
    nombre: { type: String, required: true },
    horario: { type: String, enum:["mañana","Tarde","noche"], required: true },
    programa: { type: Schema.Types.ObjectId, ref: 'Programa', required: true },
    profesor: { type: Schema.Types.ObjectId, ref: 'Profesor', required: true },
    aula: { type: Schema.Types.ObjectId, ref: 'Aula', required: true },
});

export const Grupo = model('Grupo', GrupoSchema);