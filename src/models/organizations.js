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


const getOrganizationById = async (organizationId) => {
  const sql = `
    SELECT
      organization_id,
      name,
      description,
      location
    FROM organizations
    WHERE organization_id = $1;
  `;

  const result = await pool.query(sql, [organizationId]);

  return result.rows[0];
};


export {
  getAllOrganizations,
  getOrganizationById
};
