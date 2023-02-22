"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const teamsModel_1 = require("./teamsModel");
class Matche extends sequelize_1.Model {
}
Matche.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    homeTeamId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        field: 'home_team_id',
    },
    homeTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: true,
        field: 'home_team_goals',
    },
    awayTeamId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        field: 'away_team_id',
    },
    awayTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: true,
        field: 'away_team_goals',
    },
    inProgress: {
        type: sequelize_1.BOOLEAN,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'matches',
    timestamps: false,
});
Matche.belongsTo(teamsModel_1.default, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matche.belongsTo(teamsModel_1.default, { foreignKey: 'awayTeamId', as: 'awayTeam' });
exports.default = Matche;
//# sourceMappingURL=matchesModel.js.map