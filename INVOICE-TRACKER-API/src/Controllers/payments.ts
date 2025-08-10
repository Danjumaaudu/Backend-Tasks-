// controllers/paymentController.ts

import { Request, Response } from "express";
import { pool } from "../db";
// Create Payment
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { invoice_id, payment_date, amount, method } = req.body;
    const query = `
      INSERT INTO payments (invoice_id, payment_date, amount, method)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [invoice_id, payment_date, amount, method];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Create Payment Error:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
};

// Get all Payments
export const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM payments");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Get Payments Error:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};

// Get Payment by ID
export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM payments WHERE id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Payment not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Get Payment Error:", error);
    res.status(500).json({ error: "Failed to fetch payment" });
  }
};

// Update Payment
export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { payment_date, amount, method } = req.body;
    const result = await pool.query(
      `UPDATE payments SET payment_date = $1, amount = $2, method = $3 WHERE id = $4 RETURNING *`,
      [payment_date, amount, method, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Payment not found" });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Update Payment Error:", error);
    res.status(500).json({ error: "Failed to update payment" });
  }
};

// Delete Payment
export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM payments WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Payment not found" });
    res.status(200).json({ message: "Payment deleted" });
  } catch (error) {
    console.error("Delete Payment Error:", error);
    res.status(500).json({ error: "Failed to delete payment" });
  }
};
