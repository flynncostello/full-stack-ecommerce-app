const pool = require('../../config/db');

const UserShoppingCartModel = {
    // shopping_carts //
    getUserShoppingCart: async (userId) => {
        try {
            const result = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
            const shopping_cart = result.rows[0];
            if (shopping_cart) {
                return shopping_cart;
            } else {
                throw new Error('User shopping cart not found');
            }
        } catch (error) {
            console.error('Error fetching user shopping cart:', error);
            throw error;
        }
    },

    createUserShoppingCart: async (userId, shoppingCartData) => {
        try {
            const result = await pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING *', [userId]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user shopping cart:', error);
            throw error;
        }
    },

    /*
    updateUserShoppingCart: async (userId, updatedShoppingCartData) => {
        const { total } = updatedShoppingCartData;
        try {
            const result = await pool.query('UPDATE carts SET total = $1 WHERE user_id = $2 RETURNING *', [total, userId]);
            const updatedUserShoppingCart = result.rows[0];
            if (updatedUserShoppingCart) {
                return updatedUserShoppingCart;
            } else {
                throw new Error('User shopping cart not found');
            }
        } catch (error) {
            console.error('Error updating user shopping cart:', error);
            throw error;
        }
    },
    */

    deleteUserShoppingCart: async (userId) => {
        try {
            const result = await pool.query('DELETE FROM carts WHERE user_id = $1 RETURNING *', [userId]);
            const deletedUserShoppingCart = result.rows[0];
            if (deletedUserShoppingCart) {
                return deletedUserShoppingCart;
            } else {
                throw new Error('User shopping cart not found');
            }
        } catch (error) {
            console.error('Error deleting user shopping cart:', error);
            throw error;
        }
    },

    // cart_items //
    getCartItems: async (shoppingCartId) => {
        try {
            const result = await pool.query('SELECT * FROM cart_items WHERE cart_id = $1', [shoppingCartId]);
            const cart_items = result.rows;
            if (cart_items) {
                return cart_items;
            } else {
                throw new Error('Cart items not found');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            throw error;
        }
    },

    getCartItem: async (shoppingCartId, productId) => {
        try {
            const result = await pool.query('SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2', [shoppingCartId, productId]);
            const cart_item = result.rows[0];
            if (cart_item) {
                return cart_item;
            } else {
                throw new Error('Cart item not found');
            }
        } catch (error) {
            console.error('Error fetching cart item:', error);
            throw error;
        }
    },

    createCartItem: async (shoppingCartId, cartItemData) => {
        const { product_id, quantity } = cartItemData;
        try {
            const result = await pool.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [shoppingCartId, product_id, quantity]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating cart item:', error);
            throw error;
        }
    },

    updateCartItem: async (shoppingCartId, productId, updatedCartItemData) => {
        const { quantity } = updatedCartItemData;
        try {
            const result = await pool.query('UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *', [quantity, shoppingCartId, productId]);
            const updatedCartItem = result.rows[0];
            if (updatedCartItem) {
                return updatedCartItem;
            } else {
                throw new Error('Cart item not found');
            }
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw error;
        }
    },

    deleteCartItem: async (shoppingCartId, productId) => {
        try {
            const result = await pool.query('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *', [shoppingCartId, productId]);
            const deletedCartItem = result.rows[0];
            if (deletedCartItem) {
                return deletedCartItem;
            } else {
                throw new Error('Cart item not found');
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
            throw error;
        }
    }
};

module.exports = UserShoppingCartModel;
