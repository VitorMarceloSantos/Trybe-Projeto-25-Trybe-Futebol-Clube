"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teamsModel_1 = require("../database/models/teamsModel");
const searchTeams = async () => {
    const teams = await teamsModel_1.default.findAll();
    if (!teams)
        return { status: 401, notFound: 'Teams not found' };
    return { status: 200, message: teams };
};
const searchOneTeam = async (id) => {
    const team = await teamsModel_1.default.findOne({ where: { id } });
    if (!team)
        return { status: 401, notFound: 'Team not found' };
    return { status: 200, message: team };
};
exports.default = { searchTeams, searchOneTeam };
//# sourceMappingURL=teamsService.js.map