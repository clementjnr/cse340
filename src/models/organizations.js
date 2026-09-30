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

const createOrganization = async (name, description, location) => {
  const sql = `
    INSERT INTO organizations
      (name, description, location)
    VALUES
      ($1, $2, $3)
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    name,
    description,
    location
  ]);

  return result.rows[0];
};

const updateOrganization = async (
  organizationId,
  name,
  description,
  location
) => {
  const sql = `
    UPDATE organizations
    SET
      name = $1,
      description = $2,
      location = $3
    WHERE organization_id = $4
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    name,
    description,
    location,
    organizationId
  ]);

  return result.rows[0];
};

export {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization
};
