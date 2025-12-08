import Nota from '../model/Nota.model.js';             // Ajusta la ruta si es necesario

/**
 * REPORTE 1: Listado de cursos/programas que un estudiante ha tomado, con sus notas.
 * Ruta: GET /api/reportes/cursos/estudiante/:estudianteId
 */
export const getCursosYNotasByEstudiante = async (req, res) => {
    try {
        const estudianteId = req.params.estudianteId;

        // Consulta Mongoose: Obtener todas las notas del estudiante y poblar el programa
        const historialNotas = await Nota.find({
            estudiante: estudianteId
        })
        .populate('programa', 'nombre titulo') // Poblar datos del programa
        .select('nota programa') 
        .exec();

        if (historialNotas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron notas para este estudiante.' });
        }

        res.status(200).json(historialNotas);
    } catch (error) {
        console.error('Error al obtener cursos y notas:', error);
        res.status(500).json({ message: 'Error interno del servidor al consultar notas.', details: error.message });
    }
};

/**
 * REPORTE 2: Listado de notas de un grupo (asumiendo que Grupo está ligado a Programa).
 * Ruta: GET /api/reportes/notas/programa/:programaId
 */
export const getNotasByPrograma = async (req, res) => {
    try {
        const programaId = req.params.programaId;

        // Consulta Mongoose: Obtener notas por programa, poblar estudiante y programa
        const notasPorGrupo = await Nota.find({
            programa: programaId
        })
        .populate('estudiante', 'nombre apellido') // Poblar solo nombre y apellido del Usuario (a través del Estudiante)
        .select('nota estudiante programa')
        .exec();

        if (notasPorGrupo.length === 0) {
            return res.status(404).json({ message: 'No se encontraron notas para este programa.' });
        }

        res.status(200).json(notasPorGrupo);
    } catch (error) {
        console.error('Error al obtener notas por programa:', error);
        res.status(500).json({ message: 'Error interno del servidor al consultar notas por programa.', details: error.message });
    }
};

