import db from "../../database/index.js";

export function getAll() {
  return db.many("SELECT * FROM users");
}

export function getById(id) {
  return db.one("SELECT * FROM users WHERE id = $1", [id]);
}

export function create(
  { username, email, role },
  { hash, nonce, memory, passes, parallelism, tagLength },
) {
  return db.one(
    "INSERT INTO users (username, email, password_hash, password_nonce, password_memory, password_passes, password_parallelism, password_tag_length, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, username, email, role",
    [
      username,
      email,
      hash,
      nonce,
      memory,
      passes,
      parallelism,
      tagLength,
      role,
    ],
  );
}

export function remove(id) {
  return db.none("DELETE FROM users WHERE id= $1", id);
}
