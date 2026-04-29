import express from "express";
import { validateSensitive } from "../middleware/validate.js";
import * as usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/", usersController.getAll);

router.get("/:id", usersController.getById);

router.post(
  "/register",
  validateSensitive(["username", "email", "password"]),
  usersController.create,
);

router.delete("/:id", usersController.remove);

export default router;
