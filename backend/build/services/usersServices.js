"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const generateToken_1 = require("../token/generateToken");
const usersModel_1 = require("../database/models/usersModel");
const searchUser = async (email, password) => {
    const user = await usersModel_1.default.findOne({ where: { email } });
    if (!user)
        return { status: 401, message: 'Incorrect email or password' };
    // Verifica Password
    const verifyPassword = await bcrypt.compare(password, user.dataValues.password);
    // Para realizar a verificação deve passar a senha(sem criptografia) e senha criptografada
    if (verifyPassword === false)
        return { status: 401, message: 'Incorrect email or password' };
    // Gerando o token
    const token = (0, generateToken_1.default)(user.dataValues);
    return { status: 200, message: token };
};
const searchRole = async (email) => {
    const userRole = await usersModel_1.default.findOne({ where: { email } });
    if (!userRole) {
        return { status: 401, message: 'User not found' };
    }
    return { status: 200, message: userRole.dataValues.role };
};
exports.default = { searchUser, searchRole };
//# sourceMappingURL=usersServices.js.map