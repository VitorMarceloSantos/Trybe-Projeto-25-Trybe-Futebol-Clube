"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = require("../token/validateToken");
const matchesController_1 = require("../controllers/matchesController");
const validateTeams_1 = require("../middlewares/validateTeams");
const router = (0, express_1.Router)();
router.get('/', matchesController_1.default.searchMatches);
router.post('/', validateToken_1.default, validateTeams_1.default, matchesController_1.default.addMatcheProgress);
router.patch('/:id/finish', matchesController_1.default.updateProgress);
router.patch('/:id', matchesController_1.default.updateProgressGoals);
exports.default = router;
//# sourceMappingURL=matchRoute.js.map