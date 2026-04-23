import express from "express";
import db from "../../database/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.many("SELECT * FROM posts")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/:id", (req, res) => {
  db.one("SELECT * FROM posts WHERE id = $1", [req.params.id])
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/", (req, res) => {
  const { user_id, title, content, category } = req.body;
  db.one(
    "INSERT INTO posts (user_id, title, content, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, title, content, category],
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
  db.one("DELETE FROM posts WHERE id = $1 RETURNING *", id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

export default router;
