// controllers/invoiceItemController.ts

import { Request, Response } from "express";
import { pool } from "../db";

// Create Invoice Item
export const createInvoiceItem = async (req: Request, res: Response) => {
  try {
    const { invoice_id, description, quantity, unit_price } = req.body;
    const query = `
      INSERT INTO invoice_items (invoice_id, description, quantity, unit_price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [invoice_id, description, quantity, unit_price];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Create Invoice Item Error:", error);
    res.status(500).json({ error: "Failed to create invoice item" });
  }
};

// Get all Invoice Items
export const getAllInvoiceItems = async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM invoice_items");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Get Invoice Items Error:", error);
    res.status(500).json({ error: "Failed to fetch invoice items" });
  }
};

// Get Invoice Item by ID
export const getInvoiceItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM invoice_items WHERE id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Invoice item not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Get Invoice Item Error:", error);
    res.status(500).json({ error: "Failed to fetch invoice item" });
  }
};

// Update Invoice Item
export const updateInvoiceItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, quantity, unit_price } = req.body;
    const result = await pool.query(
      `UPDATE invoice_items SET description = $1, quantity = $2, unit_price = $3 WHERE id = $4 RETURNING *`,
      [description, quantity, unit_price, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Invoice item not found" });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Update Invoice Item Error:", error);
    res.status(500).json({ error: "Failed to update invoice item" });
  }
};

// Delete Invoice Item
export const deleteInvoiceItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM invoice_items WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Invoice item not found" });
    res.status(200).json({ message: "Invoice item deleted" });
  } catch (error) {
    console.error("Delete Invoice Item Error:", error);
    res.status(500).json({ error: "Failed to delete invoice item" });
  }
};
