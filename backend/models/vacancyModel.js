import pool from '../database.js';

const vacancyModel = {
  
    getAllVacancies: async () => {
        const [vacancies] = await pool.query(`
          SELECT v.*, p.project_name, 
                 s.id as skill_id, s.skill_name
          FROM vacancy v
          LEFT JOIN project p ON v.project_id = p.id
          LEFT JOIN skill s ON v.skill_id = s.id
        `);
    
        // Aggregate skills for each vacancy
        const result = [];
        const vacancyMap = {};
    
        for (const vacancy of vacancies) {
            if (!vacancyMap[vacancy.id]) {
                vacancyMap[vacancy.id] = {
                    ...vacancy,
                    skills: []
                };
                result.push(vacancyMap[vacancy.id]);
            } 
    
            if (vacancy.skill_id && vacancy.skill_name) {
                vacancyMap[vacancy.id].skills.push({
                    id: vacancy.skill_id,
                    name: vacancy.skill_name
                });
            }
        }
    
        return result;
      },

      getVacancyById: async (id) => {
        const [vacancies] = await pool.query(`
            SELECT v.*, p.project_name, p.start_date, p.end_date, 
                   s.id as skill_id, s.skill_name,
                   pi.industry_id, i.industry_name
            FROM vacancy v
            LEFT JOIN project p ON v.project_id = p.id
            LEFT JOIN skill s ON v.skill_id = s.id
            LEFT JOIN project_industry pi ON p.id = pi.project_id
            LEFT JOIN industry i ON pi.industry_id = i.id
            WHERE v.id = ?
        `, [id]);
    
        const vacancy = vacancies[0];
        if (!vacancy) return null;
    
        const industries = vacancies.map(v => ({
            id: v.industry_id, 
            name: v.industry_name
        })).filter(industry => industry.id && industry.name);
    
        const result = {
            ...vacancy,
            start_date: vacancy.start_date,
            end_date: vacancy.end_date,
            industries,
            skills: vacancies.map(v => ({ id: v.skill_id, name: v.skill_name })).filter(skill => skill.id && skill.name)
        };
    
        return result;
    },
    
  
  //... other CRUD operations can be added similar to the projectModel
};

export default vacancyModel;
