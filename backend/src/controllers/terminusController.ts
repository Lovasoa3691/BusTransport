import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { TerminusService } from "../services/terminusService";

const terminusService = new TerminusService();

export class TerminusController {
  async create(req: Request, res: Response) {
    try {
      const { name_stop, code_stop, latitude, longitude } = req.body;

      const terminusData: any = {
        name_stop: name_stop,
        code_stop: code_stop,
        latitude: latitude,
        longitude: longitude,
      };

      const terminus = await terminusService.createTerminus(terminusData);

      res.status(201).json({
        success: true,
        data: terminus,
      });
    } catch (error: any) {
      console.error("Erreur lors de la création du terminus:", error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const termini = await terminusService.getAllTermini();

      res.status(200).json({
        success: true,
        count: termini.length,
        data: termini,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

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

      const terminus = await terminusService.getTerminusById(id);
      if (!terminus) {
        return res
          .status(404)
          .json({ success: false, message: "Terminus non trouvé" });
      }

      res.status(200).json({
        success: true,
        data: terminus,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

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

      const updatedTerminus = await terminusService.updateTerminus(
        id,
        req.body,
      );
      res.status(200).json({
        success: true,
        message: "Terminus mis à jour avec succès",
        data: updatedTerminus,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

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

      await terminusService.deleteTerminus(id);
      res.status(200).json({
        success: true,
        message: "Terminus supprimé avec succès",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
