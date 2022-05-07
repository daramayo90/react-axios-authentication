const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
};
const fsPromises = require('fs').promises;
const path = require('path');

// On client, also delete the accessToken
const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back

    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);

    if (!foundUser) {
        res.clearCookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None'
            // secure: true (?)
        });

        return res.sendStatus(204); // No content to send back
    }

    // Delete the refreshToken in the db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };

    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    // In PRD -> secure: true - only serves on https
    res.clearCookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None'
        // secure: true (?)
    });

    res.sendStatus(204); // No content to send back

}

module.exports = { handleLogout };