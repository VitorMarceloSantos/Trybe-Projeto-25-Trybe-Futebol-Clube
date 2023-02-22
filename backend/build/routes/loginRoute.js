"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateLogin_1 = require("../middlewares/validateLogin");
const usersController_1 = require("../controllers/usersController");
const validateToken_1 = require("../token/validateToken");
const router = (0, express_1.Router)();
router.post('/', validateLogin_1.default, usersController_1.default.searchUser);
router.get('/validate', validateToken_1.default, usersController_1.default.validateUser);
exports.default = router;
//# sourceMappingURL=loginRoute.js.map