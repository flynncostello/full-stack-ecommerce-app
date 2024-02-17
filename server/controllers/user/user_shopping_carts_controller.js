const userShoppingCartModel = require('../../models/user/user_shopping_carts_model');

// shopping_carts //
exports.getUserShoppingCarById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const shoppingCart = await userShoppingCartModel.getUserShoppingCart(userId);
        res.json(shoppingCart);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createUserShoppingCart = async (req, res) => {
    const userId = req.params.userId;
    const shoppingCartData = req.body;
    try {
        const newShoppingCart = await userShoppingCartModel.createUserShoppingCart(userId, shoppingCartData);
        res.status(201).json(newShoppingCart);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/*
exports.updateShoppingCart = async (req, res) => {
    const userId = req.params.userId;
    const updatedShoppingCartData = req.body;
    try {
        const updatedShoppingCart = await userShoppingCartModel.updateUserShoppingCart(userId, updatedShoppingCartData);
        res.json(updatedShoppingCart);
    } catch (error) {
        res.status(404).json({ error: 'Shopping cart not found' });
    }
}
*/

exports.deleteShoppingCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedShoppingCart = await userShoppingCartModel.deleteUserShoppingCart(userId);
        res.json(deletedShoppingCart);
    } catch (error) {
        res.status(404).json({ error: 'Shopping cart not found' });
    }
}

// cart_items //
exports.getCartItems = async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const cartItems = await userShoppingCartModel.getCartItems(cartId);
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getCartItemById = async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    try {
        const cartItem = await userShoppingCartModel.getCartItem(cartId, productId);
        res.json(cartItem);
    } catch (error) {
        res.status(404).json({ error: 'Cart item not found' });
    }
}

exports.createCartItem = async (req, res) => {
    const cartId = req.params.cartId;
    const cartItemData = req.body;
    try {
        const newCartItem = await userShoppingCartModel.createCartItem(cartId, cartItemData);
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateCartItem = async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const updatedCartItemData = req.body;
    try {
        const updatedCartItem = await userShoppingCartModel.updateCartItem(cartId, productId, updatedCartItemData);
        res.json(updatedCartItem);
    } catch (error) {
        res.status(404).json({ error: 'Cart item not found' });
    }
}

exports.deleteCartItem = async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    try {
        const deletedCartItem = await userShoppingCartModel.deleteCartItem(cartId, productId);
        res.json(deletedCartItem);
    } catch (error) {
        res.status(404).json({ error: 'Cart item not found' });
    }
}