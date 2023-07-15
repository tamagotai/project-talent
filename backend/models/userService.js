import pool from '../database.js';

export default {
  getUsers: async () => {
    const [records] = await pool.query("SELECT * FROM users");
    return records;
  },

  getUserById: async (id) => {
    const [records] = await pool.query(`
      SELECT *
      FROM users
      WHERE id = ?
    `, [id]);
    return records[0] || null;
  },

  deleteUser: async (id) => {
    const [{affectedRows}] = await pool.query(`
      DELETE FROM users
      WHERE id = ?
    `, [id]);
    return affectedRows;
  },

  updateUser: async (id, updatedUser) => {
    const { username, firstname, lastname, email, password, mobile, landline, role_id } = updatedUser;
    const [{affectedRows}] = await pool.query(`
      UPDATE users
      SET username = ?, firstname = ?, lastname = ?, email = ?, password = ?, mobile = ?, landline = ?, role_id = ?
      WHERE id = ?
    `, [username, firstname, lastname, email, password, mobile, landline, role_id, id]);
    return affectedRows;
  },

  createUser: async (user) => {
    const { username, firstname, lastname, email, password, mobile, landline, role_id } = user;
    const [result] = await pool.query(`
      INSERT INTO users (username, firstname, lastname, email, password, mobile, landline, role_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [username, firstname, lastname, email, password, mobile, landline, role_id]);
    const id = result.insertId;
    return getUserById(id);
  },
};
