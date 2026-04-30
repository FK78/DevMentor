import * as postsQueries from "../queries/postsQueries.js";

export async function getAll(req, res) {
  const posts = await postsQueries.getAll();
  res.status(200).json(posts);
}

export async function getById(req, res) {
  const post = await postsQueries.getById(req.params.id);
  res.status(200).json(post);
}

export async function create(req, res) {
  const post = await postsQueries.create(req.body);
  res.status(201).json(post);
}

export async function remove(req, res) {
  const { id } = req.params;
  await postsQueries.remove(id);
  res.status(204).send();
}
