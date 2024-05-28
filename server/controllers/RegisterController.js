// RegistreController.js
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send('User already registered.');
        }
        user = new User(req.body);
        await user.save();
        res.status(201).send(user);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};
