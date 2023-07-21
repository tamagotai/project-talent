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
          FROM users 
          WHERE ${field} = ?
        `, [usernameOrEmail]);
    
        if (!user) throw new Error('No user found');
    
        const isMatch = bcrypt.compareSync(password, user.password);
    
        if (!isMatch) throw new Error('Incorrect password');
    
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        return { user, token };
      },

    register: async (user) => {
        const { username, firstname, lastname, email, password, confirmPassword } = user;
        if (!validator.isEmail(email)) throw new Error('Invalid email');
        if (!validator.isStrongPassword(password)) throw new Error('Weak password');
        if (password !== confirmPassword) throw new Error('Passwords do not match');

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
}