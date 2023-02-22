"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateLogin(req, res, next) {
    const { body } = req;
    // Verifica sentenças sem parâmetros
    const { email, password } = body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length <= 6) {
        return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (regex.test(email) === false) {
        return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
}
exports.default = validateLogin;
//# sourceMappingURL=validateLogin.js.map