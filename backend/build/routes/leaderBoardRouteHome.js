"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderBoardController_1 = require("../controllers/leaderBoardController");
const router = (0, express_1.Router)();
router.get('/', leaderBoardController_1.default.searchLeaderHome);
exports.default = router;
//# sourceMappingURL=leaderBoardRouteHome.js.map