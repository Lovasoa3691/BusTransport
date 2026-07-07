import { Router } from "express";
import { LineController } from "../controllers/lineController";
import { verifyToken, requireRole } from "../middlewares/authMiddleware";

const router = Router();
const lineController = new LineController();

router.post("/lines", verifyToken, requireRole("Admin"), lineController.create);
router.get("/lines", lineController.getAll);
router.get(
  "/lines/:id",
  verifyToken,
  requireRole("Admin"),
  lineController.getById,
);
router.put(
  "/lines/:id",
  verifyToken,
  requireRole("Admin"),
  lineController.update,
);

// router.delete(
//   "/lines/:id",
//   verifyToken,
//   requireRole("Admin"),
//   lineController.delete,
// );

export default router;
