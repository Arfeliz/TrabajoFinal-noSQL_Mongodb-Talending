import { Schema, model} from "mongoose";

const PagoSchema = new Schema({
    monto: { type: Number, required: true },
    fecha: { type: Date, required: true }, 
    metodo: { type: String, required: true },
    totalpagado: { type: Number, required: true, default: 0 },
    deuda: { type: Number, required: true, default: 0 },
    estudiante: { type: Schema.Types.ObjectId, ref: 'Estudiante', required: true },
    grupo: { type: Schema.Types.ObjectId, ref: 'Grupo', required: true },
});

export const Pago = model('Pago', PagoSchema);
