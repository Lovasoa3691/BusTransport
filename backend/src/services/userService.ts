import { prisma } from "../client";

export class UserService {
  // CREATE
  async createUser(data: any) {
    return await prisma.user.create({ data });
  }

  // READ ALL
  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email: email },
    });
  }

  // READ BY ID
  async getUserById(id_user: number) {
    return await prisma.user.findUnique({
      where: { id_user },
    });
  }

  async updateUser(id_user: number, data: any) {
    return await prisma.user.update({
      where: { id_user },
      data,
    });
  }

  async updateDriver(id_user: number, data: any) {
    return await prisma.user.update({
      where: { id_user },
      data,
    });
  }

  async deleteUser(id_user: number) {
    return await prisma.user.delete({
      where: { id_user },
    });
  }
}
