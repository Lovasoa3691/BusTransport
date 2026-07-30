import { Request, Response } from "express";
import { LineService } from "../services/lineService";
import axios from "axios";

const lineService = new LineService();

async function fetchRoutePath(
  points: { latitude: string | number; longitude: string | number }[],
): Promise<[number, number][]> {
  if (points.length < 2) return [];

  const coordinatesString = points
    .map((point) => `${point.longitude},${point.latitude}`)
    .join(";");

  const url =
    `https://router.project-osrm.org/route/v1/driving/${coordinatesString}` +
    `?overview=full&geometries=geojson`;

  const response = await axios.get(url);

  return response.data.routes[0].geometry.coordinates.map(
    ([longitude, latitude]: [number, number]) => [latitude, longitude],
  );
}

function buildRoutePoints(
  stopsCoords: { latitude: string; longitude: string }[],
  viaPoints: { latitude: number; longitude: number }[],
) {
  return [
    stopsCoords[0],

    ...viaPoints.map((point) => ({
      latitude: point.latitude,
      longitude: point.longitude,
    })),

    stopsCoords[stopsCoords.length - 1],
  ];
}

export class LineController {
  async create(req: Request, res: Response) {
    try {
      const { bus_id, line_name, description, price, lineStops, viaPoints } =
        req.body;

      const stop_ids = lineStops.map((stop: any) => stop.id_stop);

      if (!Array.isArray(stop_ids) || stop_ids.length < 2) {
        return res.status(400).json({
          success: false,
          error: "Il faut au minimum deux arrêts.",
        });
      }

      const stopsCoords = await lineService.getStopsCoordinates(stop_ids);

      // Construction du trajet personnalisé
      const routePoints = buildRoutePoints(stopsCoords, viaPoints || []);
      console.log("RoutePoints: ", routePoints);

      // Génération de la vraie route
      const road_path = await fetchRoutePath(routePoints);
      console.log("RoutePath: ", road_path);

      const lineData = {
        bus_id: parseInt(bus_id),
        line_name,
        description,
        price: parseInt(price),
        viaPoints,
        lineStops,
        road_path,
      };

      console.log("Data :", lineData);

      const line = await lineService.createLine(lineData);

      res.status(201).json({
        success: true,
        data: line,
      });
    } catch (error: any) {
      console.error(error);

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
