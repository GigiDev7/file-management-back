import express, { Express } from "express";
import cors from "cors";
import serveIndex from "serve-index";
import "./connectDB";
import usersRouter from "./routes/users";
import fileRouter from "./routes/files";
import errorHandler from "./middleware/errorHandler";

const app: Express = express();

//app middlewares
app.use(cors());
app.use(express.json());
app.use(
  "/ftp",
  express.static("public"),
  serveIndex("public", {
    icons: true,
  })
);

//api routes
app.use("/auth", usersRouter);
app.use("/file", fileRouter);

//error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
