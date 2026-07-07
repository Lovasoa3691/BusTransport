import { prisma } from "../client";

export class BusService {
  async createBus(data: any) {
    return await prisma.bus.create({ data });
  }

  async getAllBuses() {
    return await prisma.bus.findMany({
      include: {
        driver: true,
      },
    });
  }

  async getBusById(id_bus: number) {
    return await prisma.bus.findUnique({
      where: { id_bus },
    });
  }

  async updateBus(id_bus: number, data: any) {
    return await prisma.bus.update({
      where: { id_bus },
      data,
    });
  }
}
