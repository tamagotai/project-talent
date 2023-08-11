import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import pool from '../database.js';

export default {
    login: async (usernameOrEmail, password) => {
        const isEmail = validator.isEmail(usernameOrEmail);
        const field = isEmail ? 'email' : 'username';
      
        const [user] = await pool.query(`
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
    
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10d' });
    
        return { user, token };
      },

    register: async (user) => {
        const { username, firstname, lastname, email, password, mobile, landline, role_id } = user;
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
        return result.insertId;
    },
}