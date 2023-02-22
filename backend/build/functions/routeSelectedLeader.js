"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortResults_1 = require("./sortResults");
class Team {
    constructor(nameTeam) {
        this.totalPoints = 0;
        this.totalGames = 0;
        this.totalVictories = 0;
        this.totalDraws = 0;
        this.totalLosses = 0;
        this.goalsFavor = 0;
        this.goalsOwn = 0;
        this.goalsBalance = 0;
        this.efficiency = '';
        this.name = nameTeam;
    }
    addPointsVictory() {
        this.totalPoints += 3;
    }
    addPointsDraw() {
        this.totalPoints += 1;
    }
    addGames() {
        this.totalGames += 1;
    }
    addTotalVictories() {
        this.totalVictories += 1;
    }
    addTotalDraws() {
        this.totalDraws += 1;
    }
    addTotalLosses() {
        this.totalLosses += 1;
    }
    addGoalsFavor(goals) {
        this.goalsFavor += goals;
    }
    addGoalsOwn(goals) {
        this.goalsOwn += goals;
    }
    resultGoalsBalance() {
        this.goalsBalance = this.goalsFavor - this.goalsOwn;
    }
    resultEfficiency() {
        this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
    }
}
// Criação dos objetos
function createNewObject(arrayMatches, match) {
    if ((arrayMatches.filter((team) => match.homeTeam.teamName === team.name)).length === 0) { // verifica se já exite
        arrayMatches.push(new Team(match.homeTeam.teamName));
    }
    if ((arrayMatches.filter((team) => match.awayTeam.teamName === team.name)).length === 0) { // verifica se já exite
        arrayMatches.push(new Team(match.awayTeam.teamName));
    }
}
// Atribuindo Resultados
function addFunctions(teamObject, goalsFavor, goalsOwn) {
    teamObject.addGames();
    teamObject.addGoalsFavor(goalsFavor);
    teamObject.addGoalsOwn(goalsOwn);
    teamObject.resultGoalsBalance();
    teamObject.resultEfficiency();
}
function addFunctionsVictory(teamObject, goalsFavor, goalsOwn) {
    teamObject.addPointsVictory();
    teamObject.addTotalVictories();
    addFunctions(teamObject, goalsFavor, goalsOwn); // Adicionando as propriedades iguais
}
function addFunctionsLosses(teamObject, goalsFavor, goalsOwn) {
    teamObject.addTotalLosses();
    addFunctions(teamObject, goalsFavor, goalsOwn); // Adicionando as propriedades iguais
}
function addFunctionsDraw(homeObject, awayObject, match) {
    homeObject.addPointsDraw();
    awayObject.addPointsDraw();
    homeObject.addTotalDraws();
    awayObject.addTotalDraws();
    addFunctions(homeObject, match.homeTeamGoals, match.awayTeamGoals); // Adicionando - teamHome
    addFunctions(awayObject, match.awayTeamGoals, match.homeTeamGoals); // Adicionando - teamAway
}
function homeVictory(arrayMatches, match) {
    const objectHome = arrayMatches.filter((team) => match.homeTeam.teamName === team.name)[0];
    addFunctionsVictory(objectHome, match.homeTeamGoals, match.awayTeamGoals); // Adicinando resultados
    const objectAway = arrayMatches.filter((team) => match.awayTeam.teamName === team.name)[0];
    addFunctionsLosses(objectAway, match.awayTeamGoals, match.homeTeamGoals); // Adicinando resultados
}
function awayVictory(arrayMatches, match) {
    const objectAway = arrayMatches.filter((team) => match.awayTeam.teamName === team.name)[0];
    addFunctionsVictory(objectAway, match.awayTeamGoals, match.homeTeamGoals); // Adicinando resultados
    const objectHome = arrayMatches.filter((team) => match.homeTeam.teamName === team.name)[0];
    addFunctionsLosses(objectHome, match.homeTeamGoals, match.awayTeamGoals); // Adicinando resultados
}
function gameDraw(arrayMatches, match) {
    const objectHome = arrayMatches.filter((team) => match.homeTeam.teamName === team.name)[0];
    const objectAway = arrayMatches.filter((team) => match.awayTeam.teamName === team.name)[0];
    addFunctionsDraw(objectHome, objectAway, match); // Adicinando resultados
}
async function routeSelectedLeader(matchResult) {
    const arrayMatches = [];
    matchResult.forEach((match) => {
        // Criando objetos caso não existam
        createNewObject(arrayMatches, match);
        // Atribuindo resultados
        if (match.homeTeamGoals > match.awayTeamGoals) { // teamHome vencedor
            homeVictory(arrayMatches, match);
        }
        if (match.homeTeamGoals < match.awayTeamGoals) { // teamAway vencedor
            awayVictory(arrayMatches, match);
        }
        if (match.homeTeamGoals === match.awayTeamGoals) { // Empate
            gameDraw(arrayMatches, match);
        }
    });
    return (0, sortResults_1.default)(arrayMatches);
}
exports.default = routeSelectedLeader;
//# sourceMappingURL=routeSelectedLeader.js.map