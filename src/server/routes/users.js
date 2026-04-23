import express from "express";
import db from "../../database/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.many("SELECT * FROM users")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params
  db.many("SELECT * FROM users WHERE id = $1", id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/", (req, res) => {
  const { username, email, password, role } = req.body;
  db.one(
    "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, password, role],
  )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(`Error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

export default router;
