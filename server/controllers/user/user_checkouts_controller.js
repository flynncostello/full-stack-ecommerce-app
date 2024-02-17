const userCheckoutsModel = require('../../models/user/user_checkouts_model');

// checkouts //
exports.getUserCheckout = async (req, res) => {
    const userId = req.params.userId;
    try {
        const checkout = await userCheckoutsModel.getUserCheckout(userId);
        res.json(checkout);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createUserCheckout = async (req, res) => {
    const userId = req.params.userId;
    const cartId = req.body.cart_id;
    try {
        const newCheckout = await userCheckoutsModel.createUserCheckout(userId, cartId);
        res.status(201).json(newCheckout);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteUserCheckout = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedCheckout = await userCheckoutsModel.deleteUserCheckout(userId);
        res.json(deletedCheckout);
    } catch (error) {
        res.status(404).json({ error: 'Checkout not found' });
    }
}

