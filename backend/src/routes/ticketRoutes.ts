import { Router } from "express";
import { TicketController } from "../controllers/ticketController.js";
import { verifyToken, requireRole } from "../middlewares/authMiddleware.js";

const router = Router();
const ticketController = new TicketController();

router.get(
  "/tickets",
  verifyToken,
  requireRole("Admin"),
  ticketController.getAllTickets,
);

router.get(
  "/tickets/driver",
  verifyToken,
  requireRole("Driver"),
  ticketController.getTicketByDriver,
);

router.post(
  "/tickets/generate",
  verifyToken,
  requireRole("Admin"),
  ticketController.generateBatch,
);

router.post(
  "/tickets/scan",
  verifyToken,
  requireRole("Driver"),
  ticketController.scanTicket,
);

export default router;
