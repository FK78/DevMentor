import express from "express";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
import commentsRouter from "./routes/comments.js";
import { errorHandler, routeNotFound } from "./middleware/errorHandler.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.use(routeNotFound)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
