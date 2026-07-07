import { Request, Response } from "express";
import { UserService } from "../services/userService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userService = new UserService();

export class AuthController {
  // POST /api/auth/login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: "Veuillez fournir un email et un mot de passe.",
        });
      }

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, error: "Identifiants incorrects." });
      }

      if (user.status !== "Actif") {
        return res
          .status(403)
          .json({ success: false, error: "Votre compte est inactif." });
      }

      const isMatch = await bcrypt.compare(
        password,
        user.password?.toString() || "",
      );
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, error: "Identifiants incorrects." });
      }

      // 1. Génération du Token JWT
      const secret = process.env.JWT_SECRET || "default_secret";
      const token = jwt.sign(
        {
          id_user: user.id_user,
          role: user.role,
          email: user.email,
          username: user.username,
          discriminator: (user as any).discriminator,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "30d" },
      );

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      const { password: _, ...userPublicProfile } = user as any;

      return res.status(200).json({
        success: true,
        message: "Connexion réussie",
        token, // utilisé par l'application mobile
        user: userPublicProfile,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("access_token");

    return res.status(200).json({
      success: true,
      message: "Déconnecté",
    });
  }
}
