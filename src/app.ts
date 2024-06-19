import express, { Request, Response } from "express";
import globalErrorHandleMiddleware from "./app/middlewares/global-error-handler.middleware";
import notFound from "./app/middlewares/not-found.middleware";
import router from "./app/router";

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
