import { Request, Response } from "express";
import express from "express";
import router from "./router";
import notFound from "./middlewares/not-found.middleware";

// creat app
const app = express();

app.use("/api", router)

// default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.all("*", notFound)

export default app;
