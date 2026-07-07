import { Request, Response } from "express";
import { LineService } from "../services/lineService";
import axios from "axios";

const lineService = new LineService();

// Fonction utilitaire pour appeler OSRM et obtenir les coordonnées réelles des routes
async function fetchRoutePath(stopsCoords: { latitude: string; longitude: string }[]): Promise<any> {
  if (stopsCoords.length < 2) return [];

  // OSRM requiert le format [longitude,latitude] séparé par des points-virgules
  const coordinatesString = stopsCoords
    .map(coord => `${coord.longitude},${coord.latitude}`)
    .join(";");

  const url = `http://router.project-osrm.org/route/v1/driving/${coordinatesString}?overview=full&geometries=geojson`;
  
  const response = await axios.get(url);
  
  const routePoints = response.data.routes[0].geometry.coordinates.map(
    (coord: [number, number]) => [coord[1], coord[0]]
  );

  return routePoints;
}

export class LineController {
  async create(req: Request, res: Response) {
    try {
      const { bus_id, line_name, description, price, lineStops, viaPoints } = req.body;

      const stop_ids = lineStops.map((stop: any) => stop.id_stop);

      if (!stop_ids || !Array.isArray(stop_ids) || stop_ids.length < 2) {
        return res.status(400).json({
          success: false,
          error: "Vous devez fournir un tableau d'au moins 2 arrêts (stop_ids) pour créer un itinéraire.",
        });
      }

      
      const stopsCoords = await lineService.getStopsCoordinates(stop_ids);

      const route_path = await fetchRoutePath(stopsCoords);

      const lineData = {
        bus_id,
        line_name,
        description,
        price,
        road_path: route_path, // Le tableau JSON de points GPS à enregistrer dans le nouveau champ Prisma
        stop_ids    // Transmis au service pour créer les enregistrements dans LineStop
      };

      const line = await lineService.createLine(lineData);

      res.status(201).json({
        success: true,
        data: line,
      });
    } catch (error: any) {
      console.error("Erreur lors de la création de la ligne:", error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const lines = await lineService.getAllLines();

      res.status(200).json({
        success: true,
        count: lines.length,
        data: lines,
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

      const line = await lineService.getLineById(id);
      if (!line) {
        return res
          .status(404)
          .json({ success: false, message: "Ligne non trouvée" });
      }

      res.status(200).json({
        success: true,
        data: line,
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

      const updatedLine = await lineService.updateLine(id, req.body);
      res.status(200).json({
        success: true,
        message: "Ligne mise à jour avec succès",
        data: updatedLine,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
