import { Request, Response } from "express";
import { pool } from "../db";

//Get all users from the sql database
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT*FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch users" });
  }
};

//get a single user from the sql database

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

//createuser

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// updateuser in sql database
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
