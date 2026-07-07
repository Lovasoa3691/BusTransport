import { prisma } from "../client";

export class TerminusService {
  async createTerminus(data: any) {
    return await prisma.stop.create({ data });
  }

  async getAllTermini() {
    return await prisma.stop.findMany();
  }

  async getTerminusById(id_stop: number) {
    return await prisma.stop.findUnique({
      where: { id_stop: id_stop },
    });
  }

  async updateTerminus(id_stop: number, data: any) {
    return await prisma.stop.update({
      where: { id_stop: id_stop },
      data,
    });
  }

  async deleteTerminus(id_stop: number) {
    return await prisma.stop.delete({
      where: { id_stop: id_stop },
    });
  }
}
