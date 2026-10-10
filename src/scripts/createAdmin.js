import bcrypt from "bcrypt";

import pool from "../database/pool.js";


const createAdmin = async () => {

  const name = "Admin";

  const email = "admin@example.com";

  const password = "cse340!";

  const hashedPassword =
    await bcrypt.hash(password, 10);


  const sql = `
    INSERT INTO users
      (name, email, password, role)
    VALUES
      ($1, $2, $3, 'admin')
    ON CONFLICT (email)
    DO UPDATE SET
      name = EXCLUDED.name,
      password = EXCLUDED.password,
      role = 'admin'
    RETURNING
      user_id,
      name,
      email,
      role;
  `;


  const result = await pool.query(
    sql,
    [
      name,
      email,
      hashedPassword
    ]
  );


  console.log(
    "Admin account created/updated:"
  );

  console.log(result.rows[0]);


  await pool.end();
};


createAdmin()
  .catch((error) => {

    console.error(
      "Error creating admin:",
      error
    );

    process.exit(1);

  });