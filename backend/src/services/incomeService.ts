import { prisma } from "../client";

export class IncomeService {
  async createIncome(data: any) {
    return await prisma.income.create({ data });
  }

  async getAllIncomes() {
    return await prisma.income.findMany();
  }

  async getIncomeById(id_income: number) {
    return await prisma.income.findUnique({
      where: { id_in: id_income },
    });
  }

  async updateIncome(id_income: number, data: any) {
    return await prisma.income.update({
      where: { id_in: id_income },
      data,
    });
  }

  async deleteIncome(id_income: number) {
    return await prisma.income.delete({
      where: { id_in: id_income },
    });
  }
}
