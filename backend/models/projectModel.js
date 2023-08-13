import pool from '../database.js';

export default {
  getAllProjects: async () => {
    const [records] = await pool.query(`
      SELECT p.*, GROUP_CONCAT(i.industry_name) as industry_names, 
      u.firstname as organiser_firstname, u.lastname as organiser_lastname
      FROM project p
      LEFT JOIN project_industry pi ON p.id = pi.project_id
      LEFT JOIN industry i ON pi.industry_id = i.id
      LEFT JOIN user u ON p.organiser_id = u.id
      GROUP BY p.id
    `);
    return records;
  },

  getProjectById: async (id) => {
    const [records] = await pool.query(`
      SELECT p.*, GROUP_CONCAT(i.industry_name) as industry_names,
      u.firstname as organiser_firstname, u.lastname as organiser_lastname
      FROM project p
      LEFT JOIN project_industry pi ON p.id = pi.project_id
      LEFT JOIN industry i ON pi.industry_id = i.id
      LEFT JOIN user u ON p.organiser_id = u.id
      WHERE p.id = ?
      GROUP BY p.id
    `, [id]);
    return records[0] || null;
  },

  deleteProject: async (id) => {
    const [{affectedRows}] = await pool.query(`
      DELETE FROM project
      WHERE id = ?
    `, [id]);
    return affectedRows;
  },

  updateProject: async (id, updatedProject) => {
    const { project_name, description, organiser_id, start_date, end_date } = updatedProject;
    
    const [{affectedRows}] = await pool.query(`
      UPDATE project
      SET project_name = ?, description = ?, organiser_id = ?, start_date = ?, end_date = ?
      WHERE id = ?
    `, [project_name, description, organiser_id, start_date, end_date, id]);

    return affectedRows;
  },

  createProject: async (project) => {
    const { project_name, description, organiser_id, start_date, end_date } = project;
    if (!project_name || !description || !organiser_id || !start_date || !end_date ) {
      throw new Error('All mandatory fields must be filled');
    }
    
    // Check for existing project_name
    const [projects] = await pool.query(`
      SELECT * 
      FROM project 
      WHERE project_name = ?
    `, [project_name]);
    
    if (projects.length > 0) {
      throw new Error('The same project name already exists');
    }

    const [result] = await pool.query(`
      INSERT INTO project (project_name, description, organiser_id, start_date, end_date)
      VALUES (?, ?, ?, ?, ?)
    `, [project_name, description, organiser_id, start_date, end_dat]);
    return result.insertId
  },

  upsert: async (project) => {
    const { id, project_name, description, organiser_id, start_date, end_date, industry_ids } = project;
    
    if (!project_name || !description || !organiser_id || !start_date || !end_date) {
      throw new Error('All mandatory fields must be filled');
    }
    
    // Check for existing project_name
    const [projects] = await pool.query(`
      SELECT * 
      FROM project 
      WHERE project_name = ?
    `, [project_name]);
    
    let projectId;
    
    if (projects.length > 0) {
      // Update existing project
      const [{affectedRows}] = await pool.query(`
        UPDATE project
        SET project_name = ?, description = ?, organiser_id = ?, start_date = ?, end_date = ?
        WHERE id = ?
      `, [project_name, description, organiser_id, start_date, end_date, id]);
  
      projectId = id;
    } else {
      // Insert new project
      const [result] = await pool.query(`
        INSERT INTO project (project_name, description, organiser_id, start_date, end_date)
        VALUES (?, ?, ?, ?, ?)
      `, [project_name, description, organiser_id, start_date, end_date]);
      
      projectId = result.insertId;
    }
  
    // Delete existing project-industry relations
    await pool.query(`
      DELETE FROM project_industry
      WHERE project_id = ?
    `, [projectId]);
    
    // Insert new project-industry relations
    for (let industryId of industry_ids) {
      await pool.query(`
        INSERT INTO project_industry (project_id, industry_id)
        VALUES (?, ?)
      `, [projectId, industryId]);
    }
    
    return projectId;
  },
  
};
