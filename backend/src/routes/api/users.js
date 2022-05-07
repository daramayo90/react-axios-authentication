const express = require('express');
const router = express.Router();
const users = require('../../controllers/users');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), users.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), users.deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), users.getUser);

module.exports = router;