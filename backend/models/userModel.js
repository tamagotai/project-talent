import { pool } from '../server';

export default {
    getUsers: async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  getUserById: async (id) => {
    const [rows] = await pool.query(`
      SELECT *
      FROM users
      WHERE id = ?
    `, [id]);
    return rows[0];
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

  updateUser: async (id, updatedUser) => {
    const { username, firstname, lastname, email, password, mobile, landline, role_id } = updatedUser;
    await pool.query(`
      UPDATE users
      SET username = ?, firstname = ?, lastname = ?, email = ?, password = ?, mobile = ?, landline = ?, role_id = ?
      WHERE id = ?
    `, [username, firstname, lastname, email, password, mobile, landline, role_id, id]);
  },

  deleteUser: async (id) => {
    await pool.query(`
      DELETE FROM users
      WHERE id = ?
    `, [id]);
  }
};
