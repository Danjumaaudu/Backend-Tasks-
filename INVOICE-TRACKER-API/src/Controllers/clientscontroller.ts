import { Request, Response } from "express";
import { pool } from "../db";

export const getAllclients = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM clients");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

//get a single client from the sql database

export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM clients WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "client not found" });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch client" });
  }
};
//create a new client
export const createClient = async (req: Request, res: Response) => {
  const {user_id, name, email, phone,address} = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO clients (user_id, name, email, phone, address) VALUES ($1, $2, $3, $4,$5) RETURNING *",
      [user_id,name, email, phone,address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create client" });
  }
};
//update a client into the sql database
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, company } = req.body;
  try {
    const result = await pool.query(
      "UPDATE clients SET name = $1, email = $2, phone = $3, company = $4 WHERE id = $5 RETURNING *",
      [name, email, phone, company, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Client not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update client" });
  }
};

// DELETE client
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM clients WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete client" });
  }
};
