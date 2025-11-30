import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import{connectDB} from "./src/db/connect.js"

//Configurar .env
dotenv.config();

//Crear servidor
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

//Conectar a la base de datos
connectDB();

//Rutas
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
