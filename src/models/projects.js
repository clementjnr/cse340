import pool from "../database/pool.js";

const getAllProjects = async () => {
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
    ORDER BY sp.project_date, sp.title;
  `;

  const result = await pool.query(sql);

  return result.rows;
};

export {
  getAllProjects
};
