import db from "../database/index.js";

export function getByEmail(email) {
  return db.one("SELECT * FROM users WHERE email = $1", [email]);
}

export function create(
  { username, email },
  { hash, salt, memory, passes, parallelism, tagLength },
) {
  return db.one(
    "INSERT INTO users (username, email, password_hash, password_salt, password_memory, password_passes, password_parallelism, password_tag_length) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, username, email",
    [
      username,
      email,
      hash,
      salt,
      memory,
      passes,
      parallelism,
      tagLength,
    ],
  );
}

export function remove(id) {
  return db.none("DELETE FROM users WHERE id= $1", id);
}
