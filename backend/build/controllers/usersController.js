"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersServices_1 = require("../services/usersServices");
const searchUser = async (req, res) => {
    const { email, password } = req.body;
    const { status, message } = await usersServices_1.default.searchUser(email, password);
    return status === 200
        ? res.status(status).json({ token: message })
        : res.status(status).json({ message });
};
const validateUser = async (req, res) => {
    const { payload: { email } } = req.body.user; // pegando o email do decoded(validação do token)
    const { status, message } = await usersServices_1.default.searchRole(email);
    return res.status(status).json({ role: message });
};
exports.default = { searchUser, validateUser };
//# sourceMappingURL=usersController.js.map