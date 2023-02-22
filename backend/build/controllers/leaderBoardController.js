"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leaderBoardService_1 = require("../services/leaderBoardService");
const searchLeaderHome = async (_req, res) => {
    const arrayResult = await leaderBoardService_1.default.searchLeaderHome();
    return res.status(200).json(arrayResult);
};
const searchLeaderAway = async (_req, res) => {
    const arrayResult = await leaderBoardService_1.default.searchLeaderAway();
    return res.status(200).json(arrayResult);
};
const searchLeader = async (_req, res) => {
    const arrayResult = await leaderBoardService_1.default.searchLeader();
    return res.status(200).json(arrayResult);
};
exports.default = { searchLeaderHome, searchLeaderAway, searchLeader };
//# sourceMappingURL=leaderBoardController.js.map