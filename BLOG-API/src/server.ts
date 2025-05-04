import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import connect from "./database/connection";
import routes from "./routes/blogroutes";

const app =  express();
const port = process.env.PORT|| 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/blog", routes);

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    connect();
  });

  export default app;