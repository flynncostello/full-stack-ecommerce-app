const userPaymentsModel = require('../../models/user/user_payments_model');

exports.getAllUserPaymentMethods = async (req, res) => {
    const userId = req.params.userId;
    try {
        const paymentMethods = await userPaymentsModel.getUserPayments(userId);
        res.json(paymentMethods);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getUserPaymentMethodById = async (req, res) => {
    const userId = req.params.userId;
    const paymentId = req.params.paymentId;
    try {
        const paymentMethod = await userPaymentsModel.getUserPayment(userId, paymentId);
        res.json(paymentMethod);
    } catch (error) {
        res.status(404).json({ error: 'User payment method not found' });
    }
};

exports.createUserPaymentMethod = async (req, res) => {
    const userId = req.params.userId;
    const paymentMethodData = req.body;
    try {
        const newPaymentMethod = await userPaymentsModel.createUserPaymentMethod(userId, paymentMethodData);
        res.status(201).json(newPaymentMethod);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updatePaymentMethod = async (req, res) => {
    const paymentMethodId = req.params.paymentId;
    const userId = req.params.userId;
    const updatedPaymentMethodData = req.body;
    try {
        const updatedAddress = await userPaymentsModel.updateUserPaymentMethod(paymentMethodId, userId, updatedPaymentMethodData);
        res.json(updatedAddress);
    } catch (error) {
        res.status(404).json({ error: 'Address not found' });
    }
}

exports.deletePaymentMethod = async (req, res) => {
    const userId = req.params.userId;
    const paymentId = req.params.paymentId;
    try {
        const deletedPaymentMethod = await userPaymentsModel.deleteUserPaymentMethod(paymentId, userId);
        res.json(deletedPaymentMethod);
    } catch (error) {
        res.status(404).json({ error: 'Address not found' });
    }
}
