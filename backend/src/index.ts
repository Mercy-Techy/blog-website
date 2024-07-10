import express, { Application, Request, Response, json } from "express";
import cors from "cors";
import configDb from "./config.db";
import errorHandler from "./middlewares/errorHandler";
import router from "./router";
import { config } from "dotenv";

config();

const app: Application = express();
const PORT = process.env.PORT || 8000;
configDb().catch((err) => console.log(err));

app.use(cors());
app.use(json());

app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ message: "Welcome to daily reflections", data: null });
});
app.use(router);
app.use(errorHandler);
app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    message: "Requested route not found",
    data: null,
  });
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
