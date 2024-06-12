import { Request, Response } from "express";
import express from "express";

// creat app
const app = express();
let a;


// default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
