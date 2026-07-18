import { Router } from "express";
import { verifyToken, requireRole } from "../middlewares/authMiddleware";
import { IncomeController } from "../controllers/incomeController";

const router = Router();
const incomeController = new IncomeController();

router.post(
  "/income/create",
  verifyToken,
  requireRole("Admin"),
  incomeController.create,
);

router.get(
  "/income",
  verifyToken,
  requireRole("Admin"),
  incomeController.getAll,
);
router.get(
  "/income/:id",
  verifyToken,
  requireRole("Admin"),
  incomeController.getIncomeByBus,
);

export default router;
