import db from "../database/index.js";

export function getAll() {
  return db.many("SELECT * FROM comments");
}

export function getById(id) {
  return db.one("SELECT * FROM comments WHERE id = $1", [id]);
}

export function create({ post_id, user_id, content }) {
  return db.one(
    "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
    [post_id, user_id, content],
  );
}

export function remove(id) {
  return db.none("DELETE FROM comments WHERE id= $1", id);
}
