import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { pool } from '../config/db.js';

// Find user by Google ID
export const findUserByGoogleId = async (googleId) => {
  try {
    const query = 'SELECT * FROM users WHERE google_id = $1';
    const result = await pool.query(query, [googleId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error finding user by Google ID:', error);
    throw error;
  }
};


// Find user by ID
export const findUserById = async (id) => {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};


// Find user by email
export const findUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

// Create new user
export const createUser = async (userData) => {
  try {
    const { google_id: oauth_id, email, name, avatar_url, oauth_provider } = userData;
    const query = `
      INSERT INTO users (oauth_id,email,name,avatar_url,oauth_provider)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `;
    const values = [oauth_id, email, name, avatar_url, oauth_provider];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    const { name, avatar_url } = userData;
    const query = `
      UPDATE users 
      SET name = COALESCE($2, name), 
          avatar_url = COALESCE($3, avatar_url),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const values = [id, name, avatar_url];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Get all users (admin function)
export const getAllUsers = async (limit = 50, offset = 0) => {
  try {
    const query = `
      SELECT id, email, name, avatar_url, oauth_provider, is_verified, created_at, updated_at
      FROM users 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};





const UserModel = {
  async create({ email, password, name }) {
    try {
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
      
      const { rows } = await query(
        `INSERT INTO users (email, password, name) 
         VALUES ($1, $2, $3) 
         RETURNING id, email, name, created_at`,
        [email, hashedPassword, name]
      );
      
      return rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  },

  async findByEmail(email) {
    const { rows } = await query(
      'SELECT id, email, password, name FROM users WHERE email = $1',
      [email]
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });
  },

  async verifyPassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  },

  async updatePassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUNDS));
    await query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, userId]
    );
  }
};

export default UserModel;