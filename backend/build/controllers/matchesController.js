"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { IMatch } from '../interfaces/match';
const matchesService_1 = require("../services/matchesService");
// Converte em boolean
const progressBoolean = (value) => {
    let valueBoolean = false;
    switch (value) {
        case 'true':
            valueBoolean = true;
            break;
        case 'false':
            valueBoolean = false;
            break;
        default:
            console.log('String not converted');
    }
    return valueBoolean;
};
async function returnSearch(inProgress) {
    // verifca a existencia de inProgress
    if (inProgress && ['true', 'false'].includes(inProgress)) { // aceita apenas as string['true', 'false'] para transformar em boolean
        const { status, message } = await matchesService_1.default
            .searchMatchesProgress(progressBoolean(inProgress));
        return { status, message };
    }
    // caso não tenha passado o query como parâmetro, vai para outra rota
    const { status, message } = await matchesService_1.default.searchMatches();
    return { status, message };
}
const searchMatches = async (req, res) => {
    const { inProgress } = req.query; // recebendo via query
    const { status, message } = await returnSearch(inProgress);
    return status === 200
        ? res.status(status).json(message)
        : res.status(status).json({ message });
};
const addMatcheProgress = async (req, res) => {
    // Retirando o user(payload - token)
    const { user: USER, ...match } = req.body;
    const { status, message } = await matchesService_1.default.addMatcheProgress(match);
    return status === 201
        ? res.status(status).json(message)
        : res.status(status).json({ message });
};
const updateProgress = async (req, res) => {
    const { id } = req.params;
    const { status, message } = await matchesService_1.default.updateProgress(id);
    return res.status(status).json({ message });
};
const updateProgressGoals = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, message } = await matchesService_1.default
        .updateProgressGoals(id, homeTeamGoals, awayTeamGoals);
    return res.status(status).json(message);
};
exports.default = { searchMatches, addMatcheProgress, updateProgress, updateProgressGoals };
//# sourceMappingURL=matchesController.js.map