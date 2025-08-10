import { Router } from "express";
import { getAllclients,getClientById,createClient,updateClient,deleteClient } from "../Controllers/clientscontroller";

const clientroute = Router();

clientroute.get("/", getAllclients);
clientroute.get("/:id", getClientById);
clientroute.post("/", createClient);
clientroute.put("/:id", updateClient);
clientroute.delete("/:id", deleteClient);

export default clientroute;
