import express from "express";
import { validate } from "../middleware/validate.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import * as postsController from "../controllers/postsController.js";

const router = express.Router();

router.get("/", postsController.getAll);
router.get("/:id", postsController.getById);

router.post(
  "/",
  authenticateToken,
  validate(["user_id", "title", "content", "category"]),
  postsController.create,
);

router.delete("/:id", authenticateToken, postsController.remove);

export default router;
