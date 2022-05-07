const User = require('../model/User');

// On client, also delete the accessToken
const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back

    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        res.clearCookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None'
            // secure: true (?)
        });

        return res.sendStatus(204); // No content to send back
    }

    // Delete the refreshToken in the db
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    // In PRD -> secure: true - only serves on https
    res.clearCookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None'
        // secure: true (?)
    });

    res.sendStatus(204); // No content to send back

}

module.exports = { handleLogout };