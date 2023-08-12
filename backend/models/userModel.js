import pool from '../database.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

export default {
  getUsers: async () => {
    const [records] = await pool.query(`
      SELECT user.*, role.role_name 
      FROM user 
      LEFT JOIN role ON user.role_id = role.id
    `);
    return records;
  },

  getUserById: async (id) => {
    const [userRecords] = await pool.query(`
      SELECT user.*, role.role_name
      FROM user
      LEFT JOIN role ON user.role_id = role.id
      WHERE user.id = ?
    `, [id]);

    const [skillRecords] = await pool.query(`
      SELECT user_skill.skill_id, skill.skill_name, user_skill.experience_years, user_skill.hourly_wage
      FROM user_skill
      JOIN skill ON user_skill.skill_id = skill.id
      WHERE user_skill.user_id = ?
    `, [id]);

    const user = userRecords[0] || null;
    if (user) {
      user.skills = skillRecords;
    }
    return user;
  },

  getUsersByRole: async (roleId) => {
    const[records] = await pool.query("SELECT * FROM user WHERE role_id = ?", [roleId]);
    return records;
  },

  deleteUser: async (id) => {
    const [{affectedRows}] = await pool.query(`
      DELETE FROM user
      WHERE id = ?
    `, [id]);
    return affectedRows;
  },

  updateUser: async (id, updatedUser) => {
    const { username, firstname, lastname, email, password, mobile, landline, role_id } = updatedUser;
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email');
    }
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;

    const [{affectedRows}] = await pool.query(`
      UPDATE user
      SET username = ?, firstname = ?, lastname = ?, email = ?, password = ?, mobile = ?, landline = ?, role_id = ?
      WHERE id = ?
    `, [username, firstname, lastname, email, hashedPassword || password, mobile, landline, role_id, id]);

    return affectedRows;
  },

  createUser: async (user) => {
    const { username, firstname, lastname, email, password, mobile, landline, role_id } = user;
    if (!username || !firstname || !lastname || !email || !password ) {
      throw new Error('All mandatory fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email');
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error('Weak password');
    }
    // Check for existing username or email
    const [users] = await pool.query(`
      SELECT * 
      FROM user 
      WHERE email = ? OR username = ?
    `, [email, username]);
    
    if (users.length > 0) {
      throw new Error('User with the same email or username already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const [result] = await pool.query(`
      INSERT INTO user (username, firstname, lastname, email, password, mobile, landline, role_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [username, firstname, lastname, email, hashedPassword, mobile, landline, role_id]);
    return result.insertId
  },

  login: async (usernameOrEmail, password) => {
    if (!usernameOrEmail || !password ) {
      throw new Error('All fields must be filled');
    }
    const isEmail = validator.isEmail(usernameOrEmail);
    const field = isEmail ? 'email' : 'username';
  
    const [[user]] = await pool.query(`
      SELECT * 
      FROM user 
      WHERE ${field} = ?
    `, [usernameOrEmail]);

    if (!user) {
        throw new Error('No user found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return user;
  },

};
