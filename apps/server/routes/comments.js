import express from "express";
import { validate } from "../middleware/validate.js";
import * as commentsController from "../controllers/commentsController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/", commentsController.getAll);

router.get("/:id", commentsController.getById);

router.post(
  "/",
  authenticateToken,
  validate(["post_id", "user_id", "content"]),
  commentsController.create,
);

router.delete("/:id", authenticateToken, commentsController.remove);

export default router;
