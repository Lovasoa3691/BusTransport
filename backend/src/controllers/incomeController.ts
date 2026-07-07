import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { IncomeService } from "../services/incomeService";

const incomeService = new IncomeService();

export class IncomeController {
  async create(req: Request, res: Response) {
    try {
      const { ticket_id, bus_id, description, date_in, amount } = req.body;

      const incomeData: any = {
        ticket_id,
        bus_id,
        description,
        date_in,
        amount,
      };

      const income = await incomeService.createIncome(incomeData);

      res.status(201).json({
        success: true,
        data: income,
      });
    } catch (error: any) {
      console.error("Erreur lors de la création de la recette:", error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getIncomeByBus(req: Request, res: Response) {
    try {
      const busIdParam = Array.isArray(req.params.busId)
        ? req.params.busId[0]
        : req.params.busId;
      const busId = parseInt(busIdParam as string, 10);
      if (isNaN(busId)) {
        return res.status(400).json({
          success: false,
          error: "L'ID du bus fourni n'est pas un nombre valide.",
        });
      }

      const incomes = await incomeService.getAllIncomes();
      const filteredIncomes = incomes.filter(
        (income) => income.bus_id === busId,
      );

      res.status(200).json({
        success: true,
        count: filteredIncomes.length,
        data: filteredIncomes,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const incomes = await incomeService.getAllIncomes();

      res.status(200).json({
        success: true,
        count: incomes.length,
        data: incomes,
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

      const income = await incomeService.getIncomeById(id);
      if (!income) {
        return res
          .status(404)
          .json({ success: false, message: "Recette non trouvée" });
      }

      res.status(200).json({
        success: true,
        data: income,
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

      const updatedIncome = await incomeService.updateIncome(id, req.body);
      res.status(200).json({
        success: true,
        message: "Recette mise à jour avec succès",
        data: updatedIncome,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
