"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchesService_1 = require("../services/matchesService");
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
// Rota Home
// const homeTeam = 'homeTeam';
// const awayTeam = 'awayTeam';
// Rota Away
const homeTeam = 'awayTeam';
const awayTeam = 'homeTeam';
// Criação dos objetos
function createNewObject(arrayMatches, match) {
    if ((arrayMatches.filter((team) => match[homeTeam].teamName === team.name)).length === 0) { // Apenas o teamHOme
        arrayMatches.push(new Team(match[homeTeam].teamName));
    }
    // if ((arrayMatches.filter((team) => match.awayTeam.teamName === team.name)).length === 0) { // verifica se já exite
    //   arrayMatches.push(new Team(match.awayTeam.teamName));
    // }
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
function addFunctionsDraw(homeObject, 
// awayObject: ILeaderBoard,
match) {
    homeObject.addPointsDraw();
    // awayObject.addPointsDraw();
    homeObject.addTotalDraws();
    // awayObject.addTotalDraws();
    addFunctions(homeObject, match.homeTeamGoals, match.awayTeamGoals); // Adicionando - teamHome
    // addFunctions(awayObject, match.awayTeamGoals, match.homeTeamGoals); // Adicionando - teamAway
}
function homeVictory(arrayMatches, match) {
    const objectHome = arrayMatches.filter((team) => match[homeTeam].teamName === team.name)[0];
    addFunctionsVictory(objectHome, match[`${homeTeam}Goals`], match[`${awayTeam}Goals`]); // Adicinando resultados
    // const objectAway = arrayMatches.filter((team) => match.awayTeam.teamName === team.name)[0];
    // addFunctionsLosses(objectAway, match.awayTeamGoals, match.homeTeamGoals); // Adicinando resultados
}
function awayVictory(arrayMatches, match) {
    // const objectAway = arrayMatches.filter((team) => match.awayTeam.teamName === team.name)[0];
    // addFunctionsVictory(objectAway, match.awayTeamGoals, match.homeTeamGoals); // Adicinando resultados
    const objectHome = arrayMatches.filter((team) => match[homeTeam].teamName === team.name)[0];
    addFunctionsLosses(objectHome, match[`${homeTeam}Goals`], match[`${awayTeam}Goals`]); // Adicinando resultados
}
function gameDraw(arrayMatches, match) {
    const objectHome = arrayMatches.filter((team) => match[homeTeam].teamName === team.name)[0];
    // const objectAway = arrayMatches.filter((team) => match.awayTeam.teamName === team.name)[0];
    addFunctionsDraw(objectHome, match); // Adicinando resultados
}
// Ordenar arrayMatches de acordo com os critérios de desempate
function sortResult(arrayMatches) {
    return arrayMatches.sort((a, b) => {
        if (b.totalPoints === a.totalPoints) { // verifica se os times possuem a mesma pontuação -> 1° criterio
            if (b.totalVictories === a.totalVictories) { // maior numero de vitorias -> 2° criterio
                if (b.goalsBalance === a.goalsBalance) { // verifica saldo de gols -> 3° criterio
                    return b.goalsFavor - a.goalsFavor; // retorna quem fez mais gols -> 4° criterio
                }
                return b.goalsBalance - a.goalsBalance; // retorna quem tem mais gols
            }
            return b.totalVictories - a.totalVictories; // retorna quem tem mais vitorias
        }
        return b.totalPoints - a.totalPoints; // retorna quem tem mais pontos
    });
}
async function separateMacthes(req, res, next) {
    const arrayMatches = [];
    const { message } = await matchesService_1.default.searchMatchesProgress(false); // partidas encerradas
    const matchResult = message;
    // return res.status(200).json(matchResult);
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
    return res.status(200).json(sortResult(arrayMatches));
    next();
}
exports.default = separateMacthes;
//# sourceMappingURL=separeteMatches.js.map