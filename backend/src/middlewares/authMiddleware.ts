import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// On étend l'interface Request d'Express pour y injecter les infos de l'utilisateur connecté
export interface AuthenticatedRequest extends Request {
  user?: {
    id_user: number;
    role: string;
    email: string;
    username: string;
    discriminator: string;
  };
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Non authentifié",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret",
    );

    (req as any).user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: "Token invalide",
    });
  }
};

// Middleware optionnel pour filtrer par Rôle (ex: Autoriser uniquement l'Admin)
export const requireRole = (role: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        success: false,
        error: `Accès interdit. Rôle ${role} requis.`,
      });
    }
    next();
  };
};
