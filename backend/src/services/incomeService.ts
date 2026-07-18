import { prisma } from "../client";

export class IncomeService {
  async createIncome(data: any) {
    return await prisma.income.create({ data });
  }

  async getAllIncomes() {
    return await prisma.income.aggregate({
      _sum: {
        amount: true,
      },
    });
  }

  async getIncomeByBus(bus_id: number) {
    return await prisma.income.aggregate({
      where: { bus_id: bus_id },
      _sum: { amount: true },
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
