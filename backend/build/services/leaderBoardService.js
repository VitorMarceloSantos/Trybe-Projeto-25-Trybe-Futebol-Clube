"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeSelectedLeader_1 = require("../functions/routeSelectedLeader");
const routeSelectdAway_1 = require("../functions/routeSelectdAway");
const routeSelectedHome_1 = require("../functions/routeSelectedHome");
const matchesService_1 = require("./matchesService");
const searchLeaderHome = async () => {
    const { message } = await matchesService_1.default.searchMatchesProgress(false); // partidas encerradas
    const matchResult = message;
    const arrayResult = (0, routeSelectedHome_1.default)(matchResult);
    return arrayResult;
};
const searchLeaderAway = async () => {
    const { message } = await matchesService_1.default.searchMatchesProgress(false); // partidas encerradas
    const matchResult = message;
    const arrayResult = (0, routeSelectdAway_1.default)(matchResult);
    return arrayResult;
};
const searchLeader = async () => {
    const { message } = await matchesService_1.default.searchMatchesProgress(false); // partidas encerradas
    const matchResult = message;
    const arrayResult = (0, routeSelectedLeader_1.default)(matchResult);
    return arrayResult;
};
exports.default = { searchLeaderHome, searchLeaderAway, searchLeader };
//# sourceMappingURL=leaderBoardService.js.map