const pool = require('../../config/db');

const UserOrdersModel = {
    // orders //
    getUserOrderById: async (userId, orderId) => {
        try {
            const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 AND id = $2', [userId, orderId]);
            const past_order = result.rows[0];
            if (past_order) {
                return past_order;
            } else {
                throw new Error('User past order not found');
            }
        } catch (error) {
            console.error('Error fetching user shopping cart:', error);
            throw error;
        }
    },

    getUserOrders: async (userId) => {
        try {
            const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
            const past_orders = result.rows;
            if (past_orders) {
                return past_orders;
            } else {
                throw new Error('User past orders not found');
            }
        } catch (error) {
            console.error('Error fetching user past orders:', error);
            throw error;
        }
    },

    createUserOrder: async (userId, pastOrderDetails) => {
        const { total } = pastOrderDetails;
        try {
            const result = await pool.query('INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *', [userId, total]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user past order:', error);
            throw error;
        }
    },

    updateUserOrder: async (userId, orderId, updatedPastOrderDetails) => {
        const { total } = updatedPastOrderDetails;
        try {
            const result = await pool.query('UPDATE orders SET total = $1 WHERE user_id = $2 AND id = $3 RETURNING *', [total, userId, orderId]);
            const updatedPastOrder = result.rows[0];
            if (updatedPastOrder) {
                return updatedPastOrder;
            } else {
                throw new Error('User past order not found');
            }
        } catch (error) {
            console.error('Error updating user past order:', error);
            throw error;
        }
    },

    deleteUserOrder: async (userId, orderId) => {
        try {
            const result = await pool.query('DELETE FROM orders WHERE user_id = $1 AND id = $2 RETURNING *', [userId, orderId]);
            const deletedUserPastOrder = result.rows[0];
            if (deletedUserPastOrder) {
                return deletedUserPastOrder;
            } else {
                throw new Error('User past order not found');
            }
        } catch (error) {
            console.error('Error deleting user past order:', error);
            throw error;
        }
    },
    
    
    // order_status //
    getOrderStatus: async (orderId) => {
        try {
            const result = await pool.query('SELECT * FROM order_status WHERE order_id = $1', [orderId]);
            const order_status = result.rows[0];
            if (order_status) {
                return order_status;
            } else {
                throw new Error('User order status info not found');
            }
        } catch (error) {
            console.error('Error fetching user order status info:', error);
            throw error;
        }
    },

    createOrderStatus: async (orderId, orderStatusInfo) => {
        const { paid, paid_date, posted, posted_date, delivered, delivered_date } = orderStatusInfo;
        try {
            const result = await pool.query('INSERT INTO order_status (order_id, paid, paid_date, posted, posted_date, delivered, delivered_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [orderId, paid, paid_date, posted, posted_date, delivered, delivered_date]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating order status:', error);
            throw error;
        }
    },

    updateOrderStatus: async (orderId, updatedOrderInfo) => {
        const { paid, paid_date, posted, posted_date, delivered, delivered_date } = updatedOrderInfo;
        try {
            const result = await pool.query('UPDATE order_status SET paid = $1, paid_date = $2, posted = $3, posted_date = $4, delivered = $5, delivered_date = $6 WHERE order_id = $7 RETURNING *', [paid, paid_date, posted, posted_date, delivered, delivered_date, orderId]);
            const updatedOrderStatus = result.rows[0];
            if (updatedOrderStatus) {
                return updatedOrderStatus;
            } else {
                throw new Error('Order status info not found');
            }
        } catch (error) {
            console.error('Error updating order status info:', error);
            throw error;
        }
    },

    // order_items //
    getOrderItems: async (orderId) => {
        try {
            const result = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
            const order_items = result.rows;
            if (order_items) {
                return order_items;
            } else {
                throw new Error('Order items not found');
            }
        } catch (error) {
            console.error('Error fetching order items:', error);
            throw error;
        }
    },

    createOrderItem: async (orderId, orderItem) => {
        const { product_id, quantity } = orderItem;
        try {
            const result = await pool.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [orderId, product_id, quantity]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating order item:', error);
            throw error;
        }
    }
};

module.exports = UserOrdersModel;
