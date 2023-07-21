import pool from '../database.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

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
    const { username, firstname, lastname, email, password, confirmPassword } = user;
    if (!validator.isEmail(email)) throw new Error('Invalid email');

    // Check for existing username or email
    const [existingUser] = await pool.query(`
      SELECT * 
      FROM users 
      WHERE email = ? OR username = ?
    `, [email, username]);

    if (existingUser) throw new Error('User with the same email or username already exists');

    const hashedPassword = bcrypt.hashSync(password, 10);
    const [result] = await pool.query(`
      INSERT INTO users (username, firstname, lastname, email, password)
      VALUES (?, ?, ?, ?, ?)
    `, [username, firstname, lastname, email, hashedPassword]);
    return result.insertId;
  },

};
