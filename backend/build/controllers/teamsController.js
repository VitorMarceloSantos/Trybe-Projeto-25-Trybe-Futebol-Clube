"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teamsService_1 = require("../services/teamsService");
const searchTeams = async (_req, res) => {
    const { status, message, notFound } = await teamsService_1.default.searchTeams();
    return status === 200
        ? res.status(status).json(message)
        : res.status(status).json({ message: notFound });
};
const searchOneTeam = async (req, res) => {
    const { id } = req.params;
    const { status, message, notFound } = await teamsService_1.default.searchOneTeam(Number(id));
    return status === 200
        ? res.status(status).json(message)
        : res.status(status).json({ message: notFound });
};
exports.default = { searchTeams, searchOneTeam };
//# sourceMappingURL=teamsController.js.map