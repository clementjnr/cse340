import pool from "../database/pool.js";


const getUserByEmail = async (email) => {
  const sql = `
    SELECT
      user_id,
      name,
      email,
      password,
      role
    FROM users
    WHERE email = $1;
  `;

  const result = await pool.query(sql, [email]);

  return result.rows[0];
};


const getAllUsers = async () => {
  const sql = `
    SELECT
      user_id,
      name,
      email,
      role
    FROM users
    ORDER BY name;
  `;

  const result = await pool.query(sql);

  return result.rows;
};


const createUser = async (
  name,
  email,
  password,
  role = "user"
) => {
  const sql = `
    INSERT INTO users
      (name, email, password, role)
    VALUES
      ($1, $2, $3, $4)
    RETURNING
      user_id,
      name,
      email,
      role;
  `;

  const result = await pool.query(sql, [
    name,
    email,
    password,
    role
  ]);

  return result.rows[0];
};


export {
  getUserByEmail,
  getAllUsers,
  createUser
};