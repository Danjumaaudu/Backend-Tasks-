import express from "express";
import dotenv from "dotenv";
import route from "./Routes/users";
import clientroute from "./Routes/clients";
import invoiceroute from "./Routes/invoice";

dotenv.config();

const app = express();
app.use(express.json());
app.use('/users',route);
app.use('/clients',clientroute);
app.use('/invoices', invoiceroute)

export default app;
