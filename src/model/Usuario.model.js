import { Schema, model} from "mongoose";

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    rol: 
    { 
        type: String, 
        enum:['administrador','profesor','estudiante','invitado'] , 
        required: true,
        default: 'invitado'
    },
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
});

export const Usuario = model('Usuario', UsuarioSchema); 