import { Request, Response } from "express";
import express from "express";
import router from "./router";
import notFound from "./middlewares/not-found.middleware";
import globalErrorHandleMiddleware from "./middlewares/global-error-handler.middleware";

// creat app
const app = express();

// parse req.body
app.use(express.json());

app.use("/api", router);

// default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.all("*", notFound);

// global error handler
app.use(globalErrorHandleMiddleware);

export default app;
