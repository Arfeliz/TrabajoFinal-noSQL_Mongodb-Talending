import Pago from '../models/Pago.model.js'; 

/**
 * REPORTE 4: Listado de cobros realizados en una fecha específica.
 * Ruta: GET /api/reportes/pagos/fecha?date=YYYY-MM-DD
 */
export const getPagosByFecha = async (req, res) => {
    try {
        const fechaStr = req.query.date;
        if (!fechaStr) {
            return res.status(400).json({ message: "Se requiere el parámetro 'date' (YYYY-MM-DD)." });
        }

        // Crear el rango de la fecha (inicio del día y fin del día)
        const startOfDay = new Date(fechaStr);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(fechaStr);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const pagos = await Pago.find({
            fecha: { $gte: startOfDay, $lte: endOfDay }
        })
        .populate('estudiante', 'usuario') // Poblar el estudiante para saber quién pagó
        .exec();

        if (pagos.length === 0) {
            return res.status(404).json({ message: `No se encontraron cobros para la fecha: ${fechaStr}.` });
        }

        res.status(200).json(pagos);
    } catch (error) {
        console.error('Error al obtener cobros por fecha:', error);
        res.status(500).json({ message: 'Error interno del servidor al consultar cobros.', details: error.message });
    }
};

/**
 * REPORTE 5: Listado de cobros agrupados por fecha (Total recaudado por día).
 * Ruta: GET /api/reportes/pagos/agrupados
 */
export const getCobrosAgrupadosPorFecha = async (req, res) => {
    try {
        const resultado = await Pago.aggregate([
            {
                $group: {
                    _id: { 
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$fecha" 
                        } 
                    },
                    totalRecaudado: { $sum: "$monto" },
                    cantidadPagos: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Ordenar por fecha
            }
        ]);

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al agrupar cobros por fecha:', error);
        res.status(500).json({ message: 'Error al generar el reporte de cobros agrupados.', details: error.message });
    }
};

/**
 * REPORTE 6: Deuda total de un grupo: (mostrar Total, Pagado, y Faltante).
 * Nota: Asume que 'deuda' en el PagoSchema representa el total a cobrar, y 'monto' el pago individual. 
 * Si usas 'totalpagado' y 'deuda' en el PagoSchema como totales, el cálculo puede cambiar.
 * Usaremos 'montoTotal' como total a cobrar y sumaremos los 'monto' de los pagos realizados.
 * Ruta: GET /api/reportes/deuda/grupo/:grupoId
 */
export const getDeudaTotalByGrupo = async (req, res) => {
    try {
        const grupoId = req.params.grupoId;

        const resultado = await Pago.aggregate([
            { $match: { grupo: new mongoose.Types.ObjectId(grupoId) } }, // Filtra por el grupo
            {
                $group: {
                    _id: "$grupo",
                    totalPagado: { $sum: "$totalpagado" }, // Suma el campo 'totalpagado'
                    totalDeuda: { $sum: "$deuda" },         // Suma el campo 'deuda' (lo que falta por pagar)
                    montoTotalCobrar: { $sum: { $add: ["$totalpagado", "$deuda"] } } // Total Cobrable (Pagado + Deuda Faltante)
                }
            }
        ]);

        if (resultado.length === 0) {
            return res.status(404).json({ message: 'No hay registros de pagos para este grupo.' });
        }

        const reporte = resultado[0];
        
        res.status(200).json({
            grupoId: reporte._id,
            totalCobrado: reporte.totalPagado,
            totalDeudaFaltante: reporte.totalDeuda,
            montoTotalAPagar: reporte.montoTotalCobrar 
        });
    } catch (error) {
        console.error('Error al calcular deuda total por grupo:', error);
        res.status(500).json({ message: 'Error al generar el reporte de deuda de grupo.', details: error.message });
    }
};

/**
 * REPORTE 7: Detalle de deuda por estudiante en un grupo.
 * Ruta: GET /api/reportes/deuda/detalle/:grupoId
 */
export const getDetalleDeudaByGrupo = async (req, res) => {
    try {
        const grupoId = req.params.grupoId;

        const detalleDeuda = await Pago.aggregate([
            { $match: { grupo: new mongoose.Types.ObjectId(grupoId) } },
            {
                $group: {
                    _id: "$estudiante", // Agrupa por el ID del estudiante
                    totalPagado: { $sum: "$totalpagado" },
                    deudaFaltante: { $sum: "$deuda" },
                }
            },
            {
                // Unimos con la colección Estudiante
                $lookup: {
                    from: 'estudiantes', // Nombre de la colección de Estudiante (usualmente plural)
                    localField: '_id',
                    foreignField: '_id',
                    as: 'estudianteData'
                }
            },
            { $unwind: "$estudianteData" }, // Descomponer el array de estudiante
            {
                // Unimos con la colección Usuario para traer nombre/apellido
                $lookup: {
                    from: 'usuarios', // Nombre de la colección de Usuario (usualmente plural)
                    localField: 'estudianteData.usuario',
                    foreignField: '_id',
                    as: 'datosUsuario'
                }
            },
            { $unwind: "$datosUsuario" },
            {
                // Proyectar el resultado final
                $project: {
                    _id: 0,
                    estudianteId: '$_id',
                    nombre: '$datosUsuario.nombre',
                    apellido: '$datosUsuario.apellido',
                    totalPagado: '$totalPagado',
                    deudaFaltante: '$deudaFaltante',
                    montoTotal: { $add: ["$totalPagado", "$deudaFaltante"] }
                }
            }
        ]);

        if (detalleDeuda.length === 0) {
            return res.status(404).json({ message: 'No hay registros de deuda para este grupo.' });
        }

        res.status(200).json(detalleDeuda);
    } catch (error) {
        console.error('Error al obtener detalle de deuda por estudiante:', error);
        res.status(500).json({ message: 'Error al generar el reporte de detalle de deuda.', details: error.message });
    }
};