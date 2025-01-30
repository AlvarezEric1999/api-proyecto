import { expressjwt } from "express-jwt";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro";

const verifyToken = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'))
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Acceso denegado. Token requerido." });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded =  jwt.verify(token, JWT_SECRET);
            console.log(decoded)
            req.user = decoded;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expirado" });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Token inválido" });
            } else {
                return res.status(401).json({ message: "Error de autenticación" });
            }
        }
    } catch (error) {
        console.error("Error en verifyToken:", error); // Mantener para depuración interna
        res.status(500).json({ message: "Error interno en autenticación" });
    }
};

export default  verifyToken;
