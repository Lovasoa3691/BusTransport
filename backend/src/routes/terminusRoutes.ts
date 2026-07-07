import { Router } from "express";
import { TerminusController } from "../controllers/terminusController";
import { verifyToken, requireRole } from "../middlewares/authMiddleware";

const router = Router();
const terminusController = new TerminusController();

router.post(
  "/stops",
  verifyToken,
  requireRole("Admin"),
  terminusController.create,
);
router.get("/stops", terminusController.getAll);
router.get(
  "/stops/:id",
  verifyToken,
  requireRole("Admin"),
  terminusController.getById,
);
router.put(
  "/stops/:id",
  verifyToken,
  requireRole("Admin"),
  terminusController.update,
);

router.delete(
  "/stops/:id",
  verifyToken,
  requireRole("Admin"),
  terminusController.delete,
);

export default router;
