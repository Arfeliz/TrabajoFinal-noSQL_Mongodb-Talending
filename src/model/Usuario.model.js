import { Schema, model} from "mongoose";

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    rol: 
    { 
        type: String, 
        enum:['administrador','profesor','estudiante','invitado'] , 
        required: true,
        default: 'invitado'
    },
});

export const Usuario = model('Usuario', UsuarioSchema); 