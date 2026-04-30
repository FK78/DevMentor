import express from "express";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
import commentsRouter from "./routes/comments.js";
import { errorHandler, routeNotFound } from "./middleware/errorHandler.js";
import { corsHandler } from "./middleware/corsHandler.js";

const app = express();

app.use(express.json());
app.use(corsHandler);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.use(routeNotFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
