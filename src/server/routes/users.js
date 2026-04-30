import express from "express";
import { validate, validateSensitive } from "../middleware/validate.js";
import * as usersController from "../controllers/usersController.js";

const router = express.Router();

router.post(
  "/login",
  validate(["email", "password"]),
  usersController.getByEmail,
);

router.post(
  "/register",
  validateSensitive(["username", "email", "password"]),
  usersController.create,
);

router.delete("/:id", usersController.remove);

export default router;
