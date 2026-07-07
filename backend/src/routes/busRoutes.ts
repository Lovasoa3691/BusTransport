import { Router } from "express";
import { verifyToken, requireRole } from "../middlewares/authMiddleware";
import { BusController } from "../controllers/busController";
import { upload } from "../middlewares/upload";

const router = Router();
const busController = new BusController();

router.post(
  "/bus/create",
  upload.single("photo"),
  verifyToken,
  requireRole("Admin"),
  busController.create,
);

router.get("/buses", verifyToken, requireRole("Admin"), busController.getAll);
router.get(
  "/buses/:id",
  verifyToken,
  requireRole("Admin"),
  busController.getById,
);
router.put(
  "/buses/update/:id",
  verifyToken,
  requireRole("Admin"),
  busController.update,
);

export default router;
