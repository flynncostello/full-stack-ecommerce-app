const userOrdersModel = require('../../models/user/user_orders_model');

// orders //
exports.getUserOrder = async (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;
    try {
        const order = await userOrdersModel.getUserOrderById(userId, orderId);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getUserOrders = async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await userOrdersModel.getUserOrders(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createOrder = async (req, res) => {
    const userId = req.params.userId;
    const orderData = req.body;
    try {
        const newOrder = await userOrdersModel.createUserOrder(userId, orderData);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateOrder = async (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;
    const updatedOrderData = req.body;
    try {
        const updatedOrder = await userOrdersModel.updateUserOrder(userId, orderId, updatedOrderData);
        res.json(updatedOrder);
    } catch (error) {
        res.status(404).json({ error: 'Order not found' });
    }
}

exports.deleteOrder = async (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;
    try {
        const deletedOrder = await userOrdersModel.deleteUserOrder(userId, orderId);
        res.json(deletedOrder);
    } catch (error) {
        res.status(404).json({ error: 'Order not found' });
    }
}

// order_status //
exports.getUserOrderStatus = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orderStatus = await userOrdersModel.getOrderStatus(orderId);
        res.json(orderStatus);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createUserOrderStatus = async (req, res) => {
    const orderId = req.params.orderId;
    const orderStatusData = req.body;
    try {
        const newOrderStatus = await userOrdersModel.createOrderStatus(orderId, orderStatusData);
        res.status(201).json(newOrderStatus);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateUserOrderStatus = async (req, res) => {
    const orderId = req.params.orderId;
    const updatedOrderStatusData = req.body;
    try {
        const updatedOrderStatus = await userOrdersModel.updateOrderStatus(orderId, updatedOrderStatusData);
        res.json(updatedOrderStatus);
    } catch (error) {
        res.status(404).json({ error: 'Order status not found' });
    }
}

// order_items //
exports.getUserOrderItems = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orderItems = await userOrdersModel.getOrderItems(orderId);
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createOrderItem = async (req, res) => {
    const orderId = req.params.orderId;
    const orderItemData = req.body;
    try {
        const newOrderItem = await userOrdersModel.createOrderItem(orderId, orderItemData);
        res.status(201).json(newOrderItem);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}