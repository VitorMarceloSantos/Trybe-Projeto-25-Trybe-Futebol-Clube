"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortResults_1 = require("./sortResults");
// Criação de Constantes Globais
// Rota Home
const homeTeam = 'homeTeam';
const awayTeam = 'awayTeam';
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
    if ((arrayMatches.filter((team) => match[homeTeam].teamName === team.name)).length === 0) { // Apenas o teamHOme
        arrayMatches.push(new Team(match[homeTeam].teamName));
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
function addFunctionsDraw(homeObject, match) {
    homeObject.addPointsDraw();
    homeObject.addTotalDraws();
    addFunctions(homeObject, match.homeTeamGoals, match.awayTeamGoals); // Adicionando - teamHome
}
function homeVictory(arrayMatches, match) {
    const objectHome = arrayMatches.filter((team) => match[homeTeam].teamName === team.name)[0];
    addFunctionsVictory(objectHome, match[`${homeTeam}Goals`], match[`${awayTeam}Goals`]); // Adicinando resultados
}
function awayVictory(arrayMatches, match) {
    const objectHome = arrayMatches.filter((team) => match[homeTeam].teamName === team.name)[0];
    addFunctionsLosses(objectHome, match[`${homeTeam}Goals`], match[`${awayTeam}Goals`]); // Adicinando resultados
}
function gameDraw(arrayMatches, match) {
    const objectHome = arrayMatches.filter((team) => match[homeTeam].teamName === team.name)[0];
    addFunctionsDraw(objectHome, match); // Adicinando resultados
}
async function routeSelectedHome(matchResult) {
    const arrayMatches = [];
    matchResult.forEach((match) => {
        // Criando objetos caso não existam
        createNewObject(arrayMatches, match);
        // Atribuindo resultados
        if (match[`${homeTeam}Goals`] > match[`${awayTeam}Goals`]) { // teamHome vencedor
            homeVictory(arrayMatches, match);
        }
        if (match[`${homeTeam}Goals`] < match[`${awayTeam}Goals`]) { // teamAway vencedor
            awayVictory(arrayMatches, match);
        }
        if (match[`${homeTeam}Goals`] === match[`${awayTeam}Goals`]) { // Empate
            gameDraw(arrayMatches, match);
        }
    });
    return (0, sortResults_1.default)(arrayMatches);
    // next();
}
exports.default = routeSelectedHome;
//# sourceMappingURL=routeSelectedHome.js.map