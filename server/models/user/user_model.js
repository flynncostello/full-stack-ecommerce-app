const pool = require('../../config/db');

const UsersModel = {
    getAllUsers: async () => {
        try {
            const result = await pool.query('SELECT * FROM users');
            return result.rows;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    getUserById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            const user = result.rows[0];
            if (user) {
                return user;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    },

    createUser: async (userData) => {
        const { username, password, first_name, last_name, mobile, email } = userData;
        try {
            const result = await pool.query('INSERT INTO users (username, password, first_name, last_name, mobile, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [username, password, first_name, last_name, mobile, email]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    updateUser: async (id, updatedUserData) => {
        const { username, password, first_name, last_name, mobile, email } = updatedUserData;
        try {
            const result = await pool.query('UPDATE users SET username = $1, password = $2, first_name = $3, last_name = $4, mobile = $5, email = $6 WHERE id = $7 RETURNING *', [username, password, first_name, last_name, mobile, email, id]);
            const updatedUser = result.rows[0];
            if (updatedUser) {
                return updatedUser;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            const deletedUser = result.rows[0];
            if (deletedUser) {
                return deletedUser;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
};

module.exports = UsersModel;
