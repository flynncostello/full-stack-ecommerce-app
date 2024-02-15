const userAddressesModel = require('../../models/user/user_addresses_model');

exports.getAddressesAllUsers = async (req, res) => {
    try {
        const addresses = await userAddressesModel.getAllUsersAddresses();
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getAddressByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const addresses = await userAddressesModel.getUserAddress(userId);
        res.json(addresses);
    } catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
};

exports.createAddress = async (req, res) => {
    const userId = req.params.userId;
    const addressData = req.body;
    try {
        const newAddress = await userAddressesModel.createUserAddress(userId, addressData);
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateAddress = async (req, res) => {
    const userId = req.params.userId;
    const updatedAddressData = req.body;
    try {
        const updatedAddress = await userAddressesModel.updateUserAddress(userId, updatedAddressData);
        res.json(updatedAddress);
    } catch (error) {
        res.status(404).json({ error: 'Address not found' });
    }
}

exports.deleteAddress = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedAddress = await userAddressesModel.deleteUserAddress(userId);
        res.json(deletedAddress);
    } catch (error) {
        res.status(404).json({ error: 'Address not found' });
    }
}
