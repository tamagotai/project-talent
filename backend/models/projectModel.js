import pool from '../database.js';

export default {
  getAllProjects: async () => {
      const [records] = await pool.query("SELECT * FROM project");
      return records;
    },

  getProjectById: async (id) => {
    const [records] = await pool.query(`
      SELECT *
      FROM project
      WHERE id = ?
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
  
};
