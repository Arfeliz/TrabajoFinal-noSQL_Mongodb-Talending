import { Schema, model} from "mongoose";

const ProgramaSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    costo: { type: Number, required: true },
    typePago: { type: String, enum:['mensual','quincenal','semanal'],default:'mensual',required: true },
    duracion: { type: String, required: true },
    modalidad: { type: String, required: true, enum:['presencial','virtual','mixta'] ,default:'presencial' },
    tipo: { type: String, enum:['curso','diplomado','capacitación'], required: true }
});

export const Programa = model('Programa', ProgramaSchema);