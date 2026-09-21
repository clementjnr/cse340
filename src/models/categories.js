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





const getAllCategories = async () => {
  const sql = `
    SELECT category_id, name
    FROM categories
    ORDER BY name;
  `;

  const result = await pool.query(sql);
  return result.rows;
};


const getCategoryById = async (categoryId) => {
  const sql = `
    SELECT category_id, name
    FROM categories
    WHERE category_id = $1;
  `;

  const result = await pool.query(sql, [categoryId]);
  return result.rows[0];
};


const getCategoriesByProjectId = async (projectId) => {
  const sql = `
    SELECT c.category_id, c.name
    FROM categories AS c
    INNER JOIN project_categories AS pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;

  const result = await pool.query(sql, [projectId]);
  return result.rows;
};


export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId
};