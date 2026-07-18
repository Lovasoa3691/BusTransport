import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";
import { verifyToken, requireRole } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/upload";

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);

router.get("/users/me", verifyToken, (req, res) => {
  res.status(200).json({ success: true, user: (req as any).user });
});

router.post(
  "/drivers",
  upload.single("photo"),
  verifyToken,
  requireRole("Admin"),
  userController.createDriver,
);
router.get(
  "/drivers",
  verifyToken,
  requireRole("Admin"),
  userController.getAllDriver,
);
router.put(
  "/drivers/:id",
  verifyToken,
  requireRole("Admin"),
  userController.updateDriver,
);
router.delete(
  "/drivers/:id",
  verifyToken,
  requireRole("Admin"),
  userController.delete,
);

router.post("/users", verifyToken, requireRole("Admin"), userController.create);
router.get(
  "/users",
  verifyToken,
  requireRole("Admin"),
  userController.getAllUser,
);
router.get(
  "/users/:id",
  verifyToken,
  requireRole("Admin"),
  userController.getById,
);

router.put(
  "/users/:id",
  verifyToken,
  // requireRole("Admin"),
  userController.updateUser,
);
router.delete(
  "/users/:id",
  verifyToken,
  requireRole("Admin"),
  userController.delete,
);

export default router;
