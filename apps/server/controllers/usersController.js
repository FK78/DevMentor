import * as usersQueries from "../queries/usersQueries.js";
import * as usersService from "../services/usersService.js";

export async function getByEmail(req, res) {
  const user = await usersQueries.getByEmail(req.body.email);
  const hashObj = await usersService.hashPassword(
    req.body.password,
    Buffer.from(user.password_salt, "base64"),
  );
  const userVerify = usersService.compareHash(user.password_hash, hashObj.hash);
  userVerify
    ? res
        .status(200)
        .json(usersService.issueJWT({ id: user.id, role: user.role }))
    : res.status(401).send(userVerify);
}

export async function create(req, res) {
  const hashObj = await usersService.hashPassword(req.body.password);
  const user = await usersQueries.create(req.body, hashObj);
  res.status(201).json({
    id: user.id,
    username: user.username,
  });
}

export async function remove(req, res) {
  const { id } = req.params;
  await usersQueries.remove(id);
  res.status(204).send();
}
