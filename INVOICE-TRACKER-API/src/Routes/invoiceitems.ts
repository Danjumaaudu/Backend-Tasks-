import { Router } from "express";
import { createInvoiceItem, deleteInvoiceItem, getAllInvoiceItems, getInvoiceItemById, updateInvoiceItem } from "../Controllers/invoiceitemscontroller";

const invoiceitemsrouter = Router();

invoiceitemsrouter.get("/invoiceitems",getAllInvoiceItems);
invoiceitemsrouter.get("/:id",getInvoiceItemById);
invoiceitemsrouter.post("/",createInvoiceItem);
invoiceitemsrouter.put("/:id",updateInvoiceItem);
invoiceitemsrouter.delete(":/id", deleteInvoiceItem)

export default invoiceitemsrouter