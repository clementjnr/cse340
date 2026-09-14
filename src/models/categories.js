import pool from "../database/pool.js";

const getAllCategories = async () => {
  const sql = `
    SELECT
      category_id,
      name
    FROM categories
    ORDER BY name;
  `;

  const result = await pool.query(sql);

  return result.rows;
};

export {
  getAllCategories
};
