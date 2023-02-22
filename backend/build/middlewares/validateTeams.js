"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teamsService_1 = require("../services/teamsService");
async function validateTeams(req, res, next) {
    var _a, _b;
    const { homeTeamId, awayTeamId } = req.body;
    // Realiza a busca dos Id's
    const verifyTeams = await Promise.all([Number(homeTeamId), Number(awayTeamId)]
        .map((id) => teamsService_1.default.searchOneTeam(id)));
    for (let i = 0; i < verifyTeams.length; i += 1) { // As HOFS não funcina, pois continuam a repetir
        // Verifica se o time existe
        if (verifyTeams[i].status !== 200) {
            return res.status(404).json({ message: 'There is no team with such id!' });
        }
        // Verificar se os  dois times são iguais
        if ((i < verifyTeams.length - 1)
            && (((_a = verifyTeams[i].message) === null || _a === void 0 ? void 0 : _a.teamName) === ((_b = verifyTeams[i + 1].message) === null || _b === void 0 ? void 0 : _b.teamName))) {
            return res
                .status(422)
                .json({ message: 'It is not possible to create a match with two equal teams' });
        }
    }
    next();
}
exports.default = validateTeams;
//# sourceMappingURL=validateTeams.js.map