import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware.js";
import { TicketService } from "../services/ticketService.js";

const ticketService = new TicketService();

export class TicketController {
  async getAllTickets(req: AuthenticatedRequest, res: Response) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.status(200).json({ success: true, data: tickets });
    } catch (error: any) {
      console.error(
        "Erreur lors de la récupération des tickets :",
        error.message,
      );
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async generateBatch(req: AuthenticatedRequest, res: Response) {
    try {
      const { terminus_id, count, price } = req.body;

      if (!terminus_id || !count || !price) {
        return res.status(400).json({
          success: false,
          error: "Champs requis manquants (terminus_id, count, price).",
        });
      }

      const result = await ticketService.generateTicketsBatch(
        Number(terminus_id),
        Number(count),
        Number(price),
      );

      res.status(201).json({
        success: true,
        message: `${count} tickets générés avec succès pour l'arrêt sélectionné.`,
        data: result,
      });
    } catch (error: any) {
      console.error(
        "Erreur lors de la génération des tickets :",
        error.message,
      );
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async scanTicket(req: AuthenticatedRequest, res: Response) {
    try {
      const { qr_code, bus_id } = req.body;
      const driver_id = req.user?.id_user;

      if (!qr_code || !bus_id || !driver_id) {
        return res
          .status(400)
          .json({ success: false, error: "Données de scan incomplètes." });
      }

      const result = await ticketService.scanAndValidateTicket(
        qr_code,
        Number(driver_id),
      );

      res.status(200).json({
        success: true,
        message: "TICKET VALIDE - Recette enregistrée.",
        data: {
          ticket_number: result.ticket.num_ticket,
          amount: result.income.amount,
          date: result.income.date_in,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "ACCÈS REFUSÉ",
        error: error.message,
      });
    }
  }
}
