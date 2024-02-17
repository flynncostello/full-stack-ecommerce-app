const pool = require('../../config/db');

const UserPaymentsModel = {
    getUserPayments: async (userId) => {
        try {
            const result = await pool.query('SELECT * FROM user_payment_methods WHERE user_id = $1', [userId]);
            const user_payments = result.rows;
            if (user_payments) {
                return user_payments;
            } else {
                throw new Error('User payment methods not found');
            }
        } catch (error) {
            console.error('Error fetching user payments:', error);
            throw error;
        }
    },

    getUserPayment: async (userId, paymentId) => {
        try {
            const result = await pool.query('SELECT * FROM user_payment_methods WHERE user_id = $1 AND payment_method_id = $2', [userId, paymentId]);
            const user_payment_method = result.rows[0];
            if (user_payment_method) {
                return user_payment_method;
            } else {
                throw new Error('User payment method not found');
            }
        } catch (error) {
            console.error('Error fetching user payment method:', error);
            throw error;
        }
    },

    createUserPaymentMethod: async (userId, paymentMethodData) => {
        const { payment_method_type, card_number, expiration_date, holder_name, cvc } = paymentMethodData;
        try {
            const result = await pool.query('INSERT INTO user_payment_methods (user_id, payment_method_type, card_number, expiration_date, holder_name, cvc) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [userId, payment_method_type, card_number, expiration_date, holder_name, cvc]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user payment method:', error);
            throw error;
        }
    },

    updateUserPaymentMethod: async (paymentMethodId, userId, updatedPaymentMethodData) => {
        const { payment_method_type, card_number, expiration_date, holder_name, cvc } = updatedPaymentMethodData;
        try {
            const result = await pool.query('UPDATE user_payment_methods SET payment_method_type = $1, card_number = $2, expiration_date = $3, holder_name = $4, cvc = $5 WHERE user_id = $6 AND payment_method_id = $7 RETURNING *', [payment_method_type, card_number, expiration_date, holder_name, cvc, userId, paymentMethodId]);
            const updatedUserPaymentMethod = result.rows[0];
            if (updatedUserPaymentMethod) {
                return updatedUserPaymentMethod;
            } else {
                throw new Error('User payment method not found');
            }
        } catch (error) {
            console.error('Error updating user payment method:', error);
            throw error;
        }
    },

    deleteUserPaymentMethod: async (paymentMethodId, userId) => {
        try {
            const result = await pool.query('DELETE FROM user_payment_methods WHERE user_id = $1 AND payment_method_id = $2 RETURNING *', [userId, paymentMethodId]);
            const deletedUserPaymentMethod = result.rows[0];
            if (deletedUserPaymentMethod) {
                return deletedUserPaymentMethod;
            } else {
                throw new Error('User payment method not found');
            }
        } catch (error) {
            console.error('Error deleting user payment method:', error);
            throw error;
        }
    }
};

module.exports = UserPaymentsModel;
