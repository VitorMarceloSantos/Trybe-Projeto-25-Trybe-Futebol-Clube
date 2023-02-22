"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamsController_1 = require("../controllers/teamsController");
const router = (0, express_1.Router)();
router.get('/', teamsController_1.default.searchTeams);
router.get('/:id', teamsController_1.default.searchOneTeam);
exports.default = router;
//# sourceMappingURL=teamRoute.js.map