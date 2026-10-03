import pool from "../database/pool.js";

const getAllOrganizations = async () => {
  const sql = `
    SELECT
      organization_id,
      name,
      description,
      location,
      contact_email,
      image_filename
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
      location,
      contact_email,
      image_filename
    FROM organizations
    WHERE organization_id = $1;
  `;

  const result = await pool.query(sql, [organizationId]);

  return result.rows[0];
};

const createOrganization = async (
  name,
  description,
  location,
  contactEmail,
  imageFilename
) => {
  const sql = `
    INSERT INTO organizations
      (
        name,
        description,
        location,
        contact_email,
        image_filename
      )
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    name,
    description,
    location,
    contactEmail,
    imageFilename
  ]);

  return result.rows[0];
};

const updateOrganization = async (
  organizationId,
  name,
  description,
  location,
  contactEmail,
  imageFilename
) => {
  const sql = `
    UPDATE organizations
    SET
      name = $1,
      description = $2,
      location = $3,
      contact_email = $4,
      image_filename = $5
    WHERE organization_id = $6
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    name,
    description,
    location,
    contactEmail,
    imageFilename,
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