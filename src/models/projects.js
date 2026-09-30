import pool from "../database/pool.js";

const getAllProjects = async () => {
  const sql = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.location,
      sp.project_date,
      o.organization_id,
      o.name AS organization_name
    FROM service_projects AS sp
    INNER JOIN organizations AS o
      ON sp.organization_id = o.organization_id
    ORDER BY sp.project_date, sp.title;
  `;

  const result = await pool.query(sql);

  return result.rows;
};

const getProjectById = async (projectId) => {
  const sql = `
    SELECT
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      sp.project_date,
      o.name AS organization_name
    FROM service_projects AS sp
    INNER JOIN organizations AS o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_id = $1;
  `;

  const result = await pool.query(sql, [projectId]);

  return result.rows[0];
};

const getProjectsByCategoryId = async (
  categoryId
) => {
  const sql = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.location,
      sp.project_date,
      o.organization_id,
      o.name AS organization_name
    FROM service_projects AS sp
    INNER JOIN organizations AS o
      ON sp.organization_id = o.organization_id
    INNER JOIN project_categories AS pc
      ON sp.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY sp.project_date, sp.title;
  `;

  const result = await pool.query(sql, [categoryId]);

  return result.rows;
};

const getProjectsByOrganizationId = async (
  organizationId
) => {
  const sql = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.location,
      sp.project_date,
      o.name AS organization_name
    FROM service_projects AS sp
    INNER JOIN organizations AS o
      ON sp.organization_id = o.organization_id
    WHERE sp.organization_id = $1
    ORDER BY sp.project_date, sp.title;
  `;

  const result = await pool.query(sql, [
    organizationId
  ]);

  return result.rows;
};

const createProject = async (
  organizationId,
  title,
  description,
  location,
  projectDate
) => {
  const sql = `
    INSERT INTO service_projects
      (
        organization_id,
        title,
        description,
        location,
        project_date
      )
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    organizationId,
    title,
    description,
    location,
    projectDate
  ]);

  return result.rows[0];
};

const updateProject = async (
  projectId,
  organizationId,
  title,
  description,
  location,
  projectDate
) => {
  const sql = `
    UPDATE service_projects
    SET
      organization_id = $1,
      title = $2,
      description = $3,
      location = $4,
      project_date = $5
    WHERE project_id = $6
    RETURNING *;
  `;

  const result = await pool.query(sql, [
    organizationId,
    title,
    description,
    location,
    projectDate,
    projectId
  ]);

  return result.rows[0];
};

const getProjectCategoryIds = async (projectId) => {
  const sql = `
    SELECT category_id
    FROM project_categories
    WHERE project_id = $1
    ORDER BY category_id;
  `;

  const result = await pool.query(sql, [projectId]);

  return result.rows.map(
    (row) => row.category_id
  );
};

const updateProjectCategories = async (
  projectId,
  categoryIds
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
        DELETE FROM project_categories
        WHERE project_id = $1;
      `,
      [projectId]
    );

    for (const categoryId of categoryIds) {
      await client.query(
        `
          INSERT INTO project_categories
            (project_id, category_id)
          VALUES
            ($1, $2);
        `,
        [projectId, categoryId]
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export {
  getAllProjects,
  getProjectById,
  getProjectsByCategoryId,
  getProjectsByOrganizationId,
  createProject,
  updateProject,
  getProjectCategoryIds,
  updateProjectCategories
};