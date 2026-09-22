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
    WHERE sp.project_date >= CURRENT_DATE
    ORDER BY sp.project_date, sp.title
    LIMIT 5;
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


const getProjectsByCategoryId = async (categoryId) => {
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


const getProjectsByOrganizationId = async (organizationId) => {
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

  const result = await pool.query(sql, [organizationId]);

  return result.rows;
};


export {
  getAllProjects,
  getProjectById,
  getProjectsByCategoryId,
  getProjectsByOrganizationId
};