import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/api/v1/users", getUsers);
router.get("/api/v1/users/:id", getUserById);
router.post("/api/v1/users", createUser);
router.put("/api/v1/users/:id", updateUser);
router.delete("/api/v1/users/:id", deleteUser);

export default router;