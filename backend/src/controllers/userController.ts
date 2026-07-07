import { Request, Response } from "express";
import { UserService } from "../services/userService";
import bcrypt from "bcryptjs";
import { DriverService } from "../services/driverService";
import { parse } from "node:path";

const userService = new UserService();
const driverService = new DriverService();

export class UserController {
  // POST /api/users
  async create(req: Request, res: Response) {
    try {
      const {
        username,
        f_name,
        l_name,
        phone_number,
        email,
        password,
        role,
        status,
        discriminator,
        descriminator,
        id_driver,
        permit,
        age,
        experience,
        status_driver,
      } = req.body;

      if (!password) {
        return res
          .status(400)
          .json({ success: false, error: "Le mot de passe est obligatoire." });
      }

      // 1. Hachage du mot de passe (10 rounds est le standard de sécurité)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData: any = {
        username,
        f_name,
        l_name,
        phone_number,
        email,
        password: hashedPassword,
        role,
        status,
        discriminator: discriminator || descriminator,
      };

      if (role === "Chauffeur" || userData.discriminator === "CHAUFFEUR") {
        userData.id_driver = id_driver ? Number(id_driver) : undefined;
        userData.permit = permit;
        userData.age = age ? Number(age) : undefined;
        userData.experience = experience;
        userData.status_driver = status_driver;
      }

      const user = await userService.createUser(userData);

      const { password: _, ...userWithoutPassword } = user as any;

      res.status(201).json({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async createDriver(req: Request, res: Response) {
    try {
      const {
        l_name,
        f_name,
        phone_number,
        email,
        permit,
        age,
        experience,
        status_driver,
      } = req.body;

      const file = req.file;

      const driverData: any = {
        l_name: l_name.toLowerCase(),
        f_name: f_name.toLowerCase(),
        phone_number: "+261" + phone_number,
        email,
        permit,
        age: parseInt(age),
        experience,
        status_driver,
        role: "Driver",
        discriminator: "DRIVER",

        photo: file ? file.filename : null,
      };

      // console.log("driverData:", driverData);

      const driver = await driverService.createDriver(driverData);

      return res.status(201).json({
        success: true,
        data: driver,
      });
    } catch (error: any) {
      console.error("Erreur lors de la création du chauffeur:", error);
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAllDriver(req: Request, res: Response) {
    try {
      const users = await driverService.getAllDrivers();
      console.log("Chauffeurs récupérés:", users);
      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error: any) {
      console.error("Erreur lors de la récupération des chauffeurs:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async updateDriver(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "L'ID fourni n'est pas un nombre valide.",
        });
      }

      const updatedUser = await driverService.updateDriver(id, req.body);
      res.status(200).json({
        success: true,
        message: "Utilisateur mis à jour avec succès",
        data: updatedUser,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // DELETE /api/users/:id
  async deleteDriver(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "L'ID fourni n'est pas un nombre valide.",
        });
      }

      await driverService.deleteDriver(id);
      res.status(200).json({
        success: true,
        message: "Utilisateur supprimé avec succès",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/users
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();

      const { password, ...usersWithoutPasswords } = users as any;

      res.status(200).json({
        success: true,
        count: users.length,
        data: usersWithoutPasswords,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/users/:id
  async getById(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "L'ID fourni n'est pas un nombre valide.",
        });
      }

      const user = await userService.getUserById(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Utilisateur non trouvé" });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // PUT /api/users/:id
  async update(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "L'ID fourni n'est pas un nombre valide.",
        });
      }

      const updatedUser = await userService.updateUser(id, req.body);
      res.status(200).json({
        success: true,
        message: "Utilisateur mis à jour avec succès",
        data: updatedUser,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // DELETE /api/users/:id
  async delete(req: Request, res: Response) {
    try {
      const idParam = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const id = parseInt(idParam as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "L'ID fourni n'est pas un nombre valide.",
        });
      }

      await userService.deleteUser(id);
      res.status(200).json({
        success: true,
        message: "Utilisateur supprimé avec succès",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
