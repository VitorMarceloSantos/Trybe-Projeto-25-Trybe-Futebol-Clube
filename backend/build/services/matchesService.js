"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teamsModel_1 = require("../database/models/teamsModel");
const matchesModel_1 = require("../database/models/matchesModel");
// : Promise<IMatchReturn>
const searchMatches = async () => {
    const matches = await matchesModel_1.default.findAll({
        include: [
            { model: teamsModel_1.default, as: 'homeTeam', attributes: ['teamName'] },
            { model: teamsModel_1.default, as: 'awayTeam', attributes: ['teamName'] }
        ]
    });
    if (!matches)
        return { status: 401, message: 'Matches not found' };
    return { status: 200, message: matches };
};
const searchMatchesProgress = async (inProgress) => {
    const matchesProgress = await matchesModel_1.default.findAll({ where: { inProgress },
        include: [
            { model: teamsModel_1.default, as: 'homeTeam', attributes: ['teamName'] },
            { model: teamsModel_1.default, as: 'awayTeam', attributes: ['teamName'] }
        ] });
    // if (!matchesProgress) return { status: 401, message: 'Matches not found' };
    return { status: 200, message: matchesProgress };
};
const addMatcheProgress = async (match) => {
    // const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
    const addMacth = await matchesModel_1.default.create({
        ...match,
        inProgress: true,
    });
    if (!addMacth)
        return { status: 400, message: 'Matche not created' }; // verificar retorno
    return { status: 201, message: { id: addMacth.id, ...match, inProgress: true } };
};
const updateProgress = async (id) => {
    await matchesModel_1.default.update({ inProgress: false }, { where: { id } });
    return { status: 200, message: 'Finished' };
};
const updateProgressGoals = async (id, homeTeamGoals, awayTeamGoals) => {
    await matchesModel_1.default.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { status: 200, message: { homeTeamGoals, awayTeamGoals } };
};
exports.default = {
    searchMatches, searchMatchesProgress, addMatcheProgress, updateProgress, updateProgressGoals,
};
//# sourceMappingURL=matchesService.js.map