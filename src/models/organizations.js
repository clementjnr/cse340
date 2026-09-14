import pool from "../database/pool.js";

const getAllOrganizations = async () => {
  const sql = `
    SELECT
      organization_id,
      name,
      description,
      location
    FROM organizations
    ORDER BY name;
  `;

  const result = await pool.query(sql);

  return result.rows;
};

export {
  getAllOrganizations
};
