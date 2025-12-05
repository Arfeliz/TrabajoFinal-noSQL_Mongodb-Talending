import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import{connectDB} from "./src/db/connect.js"

import estudianteRouter from "./src/router/estudiante.routes.js";
import usuarioRouter from "./src/router/usuario.routes.js";
import profesorRouter from "./src/router/profesores.routes.js";
import programaRouter from "./src/router/programa.routes.js";
import aulaRouter from "./src/router/aula.routes.js"
import grupoRouter from "./src/router/grupo.routes.js";

//Configurar .env
dotenv.config();

//Crear servidor
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conectar a la base de datos
connectDB();

//Rutas
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});

app.use("/api", estudianteRouter);
app.use("/api", usuarioRouter);
app.use("/api", profesorRouter);
app.use("/api", programaRouter);
app.use("/api", aulaRouter);
app.use("/api", grupoRouter);

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);

    console.log(`Rutas disponibles: `);
    console.log(`http://localhost:${PORT}/api/estudiantes`);
    console.log(`http://localhost:${PORT}/api/profesores`);
    console.log(`http://localhost:${PORT}/api/usuarios`);
    console.log(`http://localhost:${PORT}/api/programas`);
    console.log(`http://localhost:${PORT}/api/aulas`);
    console.log(`http://localhost:${PORT}/api/grupos`);

});
