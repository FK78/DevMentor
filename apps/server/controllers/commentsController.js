import * as commentsQueries from "../queries/commentsQueries.js";

export async function getAll(req, res) {
  const comments = await commentsQueries.getAll();
  res.status(200).json(comments);
}

export async function getById(req, res) {
  const comment = await commentsQueries.getById(req.params.id);
  res.status(200).json(comment);
}

export async function create(req, res) {
  const comment = await commentsQueries.create(req.body);
  res.status(201).json(comment);
}

export async function remove(req, res) {
  const { id } = req.params;
  await commentsQueries.remove(id);
  res.status(204).send();
}
