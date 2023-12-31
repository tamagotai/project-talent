import pool from '../database.js';

export default {
  getAllProjects: async () => {
    const [projects] = await pool.query(`
      SELECT p.*, i.id as industry_id, i.industry_name, 
      u.firstname as organiser_firstname, u.lastname as organiser_lastname
      FROM project p
      LEFT JOIN project_industry pi ON p.id = pi.project_id
      LEFT JOIN industry i ON pi.industry_id = i.id
      LEFT JOIN user u ON p.organiser_id = u.id
      LEFT JOIN vacancy v ON p.id = v.project_id
      GROUP BY p.id, i.id
    `);

    // Aggregate industries for each project
    const result = [];
    const projectMap = {};
    for (const project of projects) {
        if (!projectMap[project.id]) {
            projectMap[project.id] = {
                ...project,
                industries: []
            };
            if (project.industry_id && project.industry_name) {
                projectMap[project.id].industries.push({
                    id: project.industry_id,
                    name: project.industry_name
                });
            }
            result.push(projectMap[project.id]);
        } else {
            if (project.industry_id && project.industry_name) {
                projectMap[project.id].industries.push({
                    id: project.industry_id,
                    name: project.industry_name
                });
            }
        }
    }
    return result;
  },

  getProjectById: async (id) => {
    const [projects] = await pool.query(`
      SELECT p.*, i.id as industry_id, i.industry_name,
      u.firstname as organiser_firstname, u.lastname as organiser_lastname,
      v.id as vacancy_id, v.vacancy_name, v.description as vacancy_description, v.hourly_wage
      FROM project p
      LEFT JOIN project_industry pi ON p.id = pi.project_id
      LEFT JOIN industry i ON pi.industry_id = i.id
      LEFT JOIN user u ON p.organiser_id = u.id
      LEFT JOIN vacancy v ON p.id = v.project_id
      WHERE p.id = ?
    `, [id]);

    const project = projects[0];
    if (!project) return null;

    const industries = projects.map(p => ({ id: p.industry_id, name: p.industry_name }))
                               .filter((industry, index, self) => 
                                  index === self.findIndex((t) => ( //findIndex function to remove duplication
                                    t.id === industry.id && t.name === industry.name
                                  ))
                               );

    const vacancies = projects.map(p => ({ id: p.vacancy_id, name: p.vacancy_name, description: p.vacancy_description, hourly_wage: p.hourly_wage }))
                              .filter((vacancy, index, self) => 
                                  index === self.findIndex((t) => (
                                    t.id === vacancy.id && t.name === vacancy.name && t.description === vacancy.description
                                  ))
                              );

    const result = {
        ...project,
        industries,
        vacancies
    };

    delete result.vacancy_description;  // remove unnecessary properties
    delete result.vacancy_id;
    delete result.vacancy_name;
    delete result.industry_id;
    delete result.industry_name;
    delete result.hourly_wage;
    
    return result;
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
