import { Request, Response } from "express";
import { pool } from "../db";
import { error, timeStamp } from "console";
import { Pool } from "pg";

//get all invoices
export const getAllinvoices = async (_req: Request, res: Response) => {
  try {
    const results = await pool.query("SELECT * FROM invoices");
    res.json(results.rows);
  } catch (err) {
    res.status(500).json({ error: "unable to fetch users" });
  }
};

//get a single invoice
export const getinvoiceByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM invoices WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "no invoice found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "unable to fetch invoice" });
  }
};

// controllers/invoiceController.ts

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { client_id, invoice_number, total_amount, notes, due_date } =
      req.body;

    const query = `
  INSERT INTO invoices (client_id, invoice_number, total_amount, notes, due_date)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

    const values = [
      client_id,
      invoice_number,
      total_amount,
      notes,
      due_date || "unpaid",
    ];

    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Create Invoice Error:", error);
    res.status(500).json({ error: "Failed to create invoice" });
  }
};


export const UpdateInvoice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { total_amount, notes, due_date } = req.body;
  try {
    const result = await pool.query(
      "UPDATE invoices SET total_amount = $1, notes = $2, due_date = $3 WHERE id = $4 RETURNING *",
      [total_amount, notes, due_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Update Invoice Error:", err); // optional but helpful
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM invoices WHERE id = $1 RETURNING *;`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Delete Invoice Error:", error);
    res.status(500).json({ error: "Failed to delete invoice" });
  }
};

