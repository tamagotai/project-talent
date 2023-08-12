import pool from '../database.js';

export default {
  //get all skills name only
  getAllSkills: async () => {
    const [records] = await pool.query(`
        SELECT skill.id AS skill_id, skill.skill_name 
        FROM skill
    `);
    return records;
},
  // Use JOINs to provide more descriptive data, similar to userModel.
  getSkills: async () => {
      const [records] = await pool.query(`
        SELECT skill.id, skill.skill_name, IFNULL(user_skill.experience_years, 0) AS experience_years, IFNULL(user_skill.hourly_wage, 0.00) AS hourly_wage
        FROM skill
        LEFT JOIN user_skill ON skill.id = user_skill.skill_id
      `);
      return records;
  },

  // Fetch user-specific skills along with the skill name.
  getUserSkills: async (userId) => {
    if (!userId) throw new Error('User ID is required');

    const [records] = await pool.query(`
      SELECT skill.id, skill.skill_name, user_skill.experience_years, user_skill.hourly_wage
      FROM user_skill
      JOIN skill ON user_skill.skill_id = skill.id
      WHERE user_skill.user_id = ?
    `, [userId]);
    return records;
  },

  // Added validation checks and improved method for upserting user skills.
  upsertUserSkills: async (userId, skills) => {
    if (!userId || !skills || !skills.length) throw new Error('Both user ID and skills are required');

    // Begin a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Delete current skills for user
      await connection.query(`
        DELETE FROM user_skill 
        WHERE user_id = ?
      `, [userId]);

      // Insert new skills for user using batch insertion.
      const values = skills.map(skill => [userId, skill.skill_id, skill.experience_years, skill.hourly_wage]);
      await connection.query(`
        INSERT INTO user_skill (user_id, skill_id, experience_years, hourly_wage) 
        VALUES ?
      `, [values]);

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};