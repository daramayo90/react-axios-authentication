const User = require('../model/User');
const bcrypt = require('bcrypt');

const newUser = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ 'message': 'Username and Password are required.' })
    }

    // Check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();

    if (duplicate) {
        return res.sendStatus(409); // Conflict
    }

    try {
        // Encrypt the password and store the new user with 'user' role permission
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // Craete and store the new user
        const newUser = await User.create({
            "username": user,
            "password": hashedPwd
        });
        
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { newUser }