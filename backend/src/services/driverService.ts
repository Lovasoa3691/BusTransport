import { prisma } from "../client";

export class DriverService {
  async createDriver(data: any) {
    return await prisma.user.create({ data });
  }

  async getAllDrivers() {
    return await prisma.user.findMany({
      where: { role: "Driver" },
    });
  }

  async getDriverByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email: email },
    });
  }

  async getDriverById(id_user: number) {
    return await prisma.user.findUnique({
      where: { id_user },
    });
  }

  async updateDriver(id_user: number, data: any) {
    return await prisma.user.update({
      where: { id_user },
      data,
    });
  }

  async deleteDriver(id_user: number) {
    return await prisma.user.delete({
      where: { id_user },
    });
  }
}
