const pool = require('../../config/db');

const UserCheckoutModel = {
    // checkouts //
    getUserCheckout: async (userId) => {
        try {
            const result = await pool.query('SELECT * FROM checkouts WHERE user_id = $1', [userId]);
            const checkout = result.rows[0];
            if (checkout) {
                return checkout;
            } else {
                throw new Error('User checkout not found');
            }
        } catch (error) {
            console.error('Error fetching user checkout:', error);
            throw error;
        }
    },

    createUserCheckout: async (userId, cartId) => {
        try {
            const result = await pool.query('INSERT INTO checkouts (user_id, cart_id) VALUES ($1, $2) RETURNING *', [userId, cartId]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user checkout:', error);
            throw error;
        }
    },

    deleteUserCheckout: async (userId) => {
        try {
            const result = await pool.query('DELETE FROM checkouts WHERE user_id = $1 RETURNING *', [userId]);
            const deletedUserCheckout = result.rows[0];
            if (deletedUserCheckout) {
                return deletedUserCheckout;
            } else {
                throw new Error('User checkout not found');
            }
        } catch (error) {
            console.error('Error deleting user checkout:', error);
            throw error;
        }
    }
};

module.exports = UserCheckoutModel;
