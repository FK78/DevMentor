import express from "express";
import db from "../../database/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.many("SELECT * FROM comments")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/:id", (req, res) => {
  db.one("SELECT * FROM comments WHERE id = $1", [req.params.id])
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/", (req, res) => {
  const { post_id, user_id, content } = req.body;
  db.one(
    "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
    [post_id, user_id, content],
  )
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.one("DELETE FROM comments WHERE id= $1 RETURNING *", id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

export default router;
