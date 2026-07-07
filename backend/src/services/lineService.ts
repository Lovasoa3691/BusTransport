import { prisma } from "../client";

export class LineService {
  /**
   * Récupère les coordonnées des arrêts et les retourne dans l'ordre exact du tableau fourni
   * @param stop_ids Tableau d'identifiants d'arrêts, ex: [10, 14, 5, 22]
   */
  async getStopsCoordinates(
    stop_ids: number[],
  ): Promise<{ latitude: string; longitude: string }[]> {
    const stops = await prisma.stop.findMany({
      where: {
        id_stop: {
          in: stop_ids,
        },
      },
      select: {
        id_stop: true,
        latitude: true,
        longitude: true,
      },
    });

    // 2. Sécurité : Vérifier si tous les arrêts demandés existent bel et bien
    if (stops.length !== stop_ids.length) {
      const foundIds = stops.map((s) => s.id_stop);
      const missingIds = stop_ids.filter((id) => !foundIds.includes(id));
      throw new Error(
        `Certains arrêts sont introuvables en base de données (IDs manquants : ${missingIds.join(", ")}).`,
      );
    }

    // 3. Réordonner le résultat pour respecter scrupuleusement l'ordre du tableau 'stop_ids'
    // (Andrainjato -> Antanifotsy -> ... -> Mahazengy)
    const orderedStops = stop_ids.map((id) => {
      const stop = stops.find((s) => s.id_stop === id);
      return {
        latitude: stop!.latitude,
        longitude: stop!.longitude,
      };
    });

    return orderedStops;
  }

  async createLine(data: any) {
    const { bus_id, line_name, description, price, viaPoints, lineStops } =
      data;

    return await prisma.$transaction(async (tx) => {
      const newLine = await tx.line.create({
        data: {
          bus_id,
          line_name,
          description,
          price,
          road_path: viaPoints,
        },
      });

      const lineStopsData = lineStops.map((stop: any, index: number) => ({
        line_id: newLine.id_line,
        stop_id: stop.id_stop,
        order: stop.order,
      }));

      await tx.lineStop.createMany({
        data: lineStopsData,
      });

      return newLine;
    });
  }

  async getAllLines() {
    return await prisma.line.findMany();
  }

  async getLineById(id_line: number) {
    return await prisma.line.findUnique({
      where: { id_line },
    });
  }

  async updateLine(id_line: number, data: any) {
    return await prisma.line.update({
      where: { id_line },
      data,
    });
  }

  async deleteLine(id_line: number) {
    return await prisma.line.delete({
      where: { id_line },
    });
  }
}
