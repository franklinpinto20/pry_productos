import { pool } from "../config/db.js";
import Joi from 'joi';

export const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM users ORDER BY id ASC");
  res.status(200).json(response.rows);
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  res.json(response.rows);
};

// Validación de los datos con Joi
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(), // Validación del correo electrónico
   
  });

export const createUser = async (req, res) => {
  try {

        // Validación de los datos recibidos en el cuerpo de la solicitud
        const { error, value } = userSchema.validate(req.body);

        // Si hay un error en la validación, enviamos un error 400
        if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
        }


    const { name, email } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const { rows } = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );

  return res.json(rows[0]);
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM users where id = $1", [
    id,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};