const pool = require('../../config/db');

const UserAddressesModel = {
    getAllUsersAddresses: async () => {
        try {
            const result = await pool.query('SELECT * FROM user_addresses');
            return result.rows;
        } catch (error) {
            console.error('Error fetching users addresses:', error);
            throw error;
        }
    },

    getUserAddress: async (userId) => {
        try {
            const result = await pool.query('SELECT * FROM user_addresses WHERE user_id = $1', [userId]);
            const user_address = result.rows[0];
            if (user_address) {
                return user_address;
            } else {
                throw new Error('User address not found');
            }
        } catch (error) {
            console.error('Error fetching user address:', error);
            throw error;
        }
    },

    createUserAddress: async (user_id, userData) => {
        const { address_line1, address_line2, city, postal_code, country } = userData;
        try {
            const result = await pool.query('INSERT INTO user_addresses (user_id, address_line1, address_line2, city, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [user_id, address_line1, address_line2, city, postal_code, country]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user address:', error);
            throw error;
        }
    },

    updateUserAddress: async (userId, updatedUserData) => {
        const { address_line1, address_line2, city, postal_code, country } = updatedUserData;
        try {
            const result = await pool.query('UPDATE user_addresses SET address_line1 = $1, address_line2 = $2, city = $3, postal_code = $4, country = $5 WHERE user_id = $6 RETURNING *', [address_line1, address_line2, city, postal_code, country, userId]);
            const updatedUserAddress = result.rows[0];
            if (updatedUserAddress) {
                return updatedUserAddress;
            } else {
                throw new Error('User address not found');
            }
        } catch (error) {
            console.error('Error updating user address:', error);
            throw error;
        }
    },

    deleteUserAddress: async (userId) => {
        try {
            const result = await pool.query('DELETE FROM user_addresses WHERE user_id = $1 RETURNING *', [userId]);
            const deletedUserAddress = result.rows[0];
            if (deletedUserAddress) {
                return deletedUserAddress;
            } else {
                throw new Error('User address not found');
            }
        } catch (error) {
            console.error('Error deleting user address:', error);
            throw error;
        }
    }
};

module.exports = UserAddressesModel;
