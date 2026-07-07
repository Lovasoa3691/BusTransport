import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { BusService } from "../services/busService";

const busService = new BusService();

export class BusController {
  async create(req: Request, res: Response) {
    try {
      const { driver_id, registration, capacity, status_bus, modele } =
        req.body;

      const file = req.file;

      const busData: any = {
        driver_id: parseInt(driver_id),
        registration,
        modele,
        capacity: parseInt(capacity),
        image: file ? file.filename : null,
        status_bus,
      };

      console.log("Données du bus à créer:", busData);

      const bus = await busService.createBus(busData);

      return res.status(201).json({
        success: true,
        data: bus,
      });
    } catch (error: any) {
      console.error("Erreur lors de la création du bus:", error);
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const buses = await busService.getAllBuses();

      res.status(200).json({
        success: true,
        count: buses.length,
        data: buses,
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

      const bus = await busService.getBusById(id);
      if (!bus) {
        return res
          .status(404)
          .json({ success: false, message: "Bus non trouvé" });
      }

      res.status(200).json({
        success: true,
        data: bus,
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

      const updatedBus = await busService.updateBus(id, req.body);
      res.status(200).json({
        success: true,
        message: "Bus mis à jour avec succès",
        data: updatedBus,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
