import { argon2, randomBytes, timingSafeEqual } from "node:crypto";
import jsonwebtoken from "jsonwebtoken";

export function hashPassword(password, passed_salt) {
  const salt = passed_salt ? passed_salt : randomBytes(16);

  const parameters = {
    message: password,
    nonce: salt,
    parallelism: 4,
    tagLength: 64,
    memory: 65536,
    passes: 3,
  };

  return new Promise((resolve, reject) => {
    argon2("argon2id", parameters, (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        hash: derivedKey.toString("base64"),
        salt: salt.toString("base64"),
        parallelism: parameters.parallelism,
        tagLength: parameters.tagLength,
        memory: parameters.memory,
        passes: parameters.passes,
      });
    });
  });
}

export function compareHash(storedHash, generatedHash) {
  const stored = Buffer.from(storedHash, "base64");
  const generated = Buffer.from(generatedHash, "base64");
  return (
    stored.length === generated.length && timingSafeEqual(stored, generated)
  );
}

export function issueJWT({id, role}) {
  return jsonwebtoken.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}