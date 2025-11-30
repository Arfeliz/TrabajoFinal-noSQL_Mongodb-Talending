import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/TrabajoFinal"

export const connectDB = async () => {
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("Conexión establecida con MongoDB correctamente");
    }
    catch(error){
        console.error("Error: al conectar con labase de datos", error.message);
        process.exit(1);
    }
}