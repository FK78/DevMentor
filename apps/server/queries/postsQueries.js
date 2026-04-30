import db from "../database/index.js";

export function getAll() {
  return db.many("SELECT * FROM posts");
}

export function getById(id) {
  return db.one("SELECT * FROM posts WHERE id = $1", [id]);
}

export function create({ user_id, title, content, category }) {
  return db.one(
    "INSERT INTO posts (user_id, title, content, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, title, content, category],
  );
}

export function remove(id) {
  return db.none("DELETE FROM posts WHERE id= $1", id);
}
