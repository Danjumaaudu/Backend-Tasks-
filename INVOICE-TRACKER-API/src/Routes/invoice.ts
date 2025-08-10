import { Router } from "express";
import { createInvoice, deleteInvoice, getAllinvoices, getinvoiceByID, UpdateInvoice } from "../Controllers/invoicecontroller";

const invoiceroute = Router();
invoiceroute.get("/",getAllinvoices);
invoiceroute.get("/:id",getinvoiceByID);
invoiceroute.post("/",createInvoice);
invoiceroute.put("/:id",UpdateInvoice);
invoiceroute.delete("/:id",deleteInvoice);

export default invoiceroute;