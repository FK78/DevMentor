import { argon2, randomBytes } from "node:crypto";

export function hashPassword(password) {
  const salt = randomBytes(16);

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
