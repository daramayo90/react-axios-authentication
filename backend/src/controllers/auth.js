const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ 'message': 'Username and Password are required.' })
    }

    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) {
        return res.sendStatus(401); // Unauthorized
    };

    // Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        const roles = Object.values(foundUser.roles);

        // Create JWTs (accessToken stored in Memory only in client side)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '90s' }
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        // The refreshToken is stored as a cookie for 1 day (httpOnly: not available to js)
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            // secure:true (?)
            maxAge: 24 * 60 * 60 * 1000
        })

        // Frontend: Secure the accessToken in memory
        res.json({ accessToken });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

module.exports = { login };