import ILeaderBoard from '../interfaces/leaderBoard';
import { IMachComplete } from '../interfaces/match';
import sortResult from './sortResults';

// Criação de Constantes Globais
// Rota Away
const homeTeam = 'awayTeam';
const awayTeam = 'homeTeam';

class Team implements ILeaderBoard {
  public name: string;
  public totalPoints = 0;
  public totalGames = 0;
  public totalVictories = 0;
  public totalDraws = 0;
  public totalLosses = 0;
  public goalsFavor = 0;
  public goalsOwn = 0;
  public goalsBalance = 0;
  public efficiency = '';

  constructor(nameTeam: string) {
    this.name = nameTeam;
  }

  public addPointsVictory() {
    this.totalPoints += 3;
  }

  public addPointsDraw() {
    this.totalPoints += 1;
  }

  public addGames() {
    this.totalGames += 1;
  }

  public addTotalVictories() {
    this.totalVictories += 1;
  }

  public addTotalDraws() {
    this.totalDraws += 1;
  }

  public addTotalLosses() {
    this.totalLosses += 1;
  }

  public addGoalsFavor(goals: number) {
    this.goalsFavor += goals;
  }

  public addGoalsOwn(goals: number) {
    this.goalsOwn += goals;
  }

  public resultGoalsBalance() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  public resultEfficiency() {
    this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }
}

// Criação dos objetos
function createNewObject(arrayMatches: ILeaderBoard[], match:IMachComplete) {
  if ((arrayMatches.filter((team) => match[homeTeam].teamName === team.name)).length === 0) { // Apenas o teamHOme
    arrayMatches.push(new Team(match[homeTeam].teamName));
  }
}

// Atribuindo Resultados
function addFunctions(teamObject: ILeaderBoard, goalsFavor: number, goalsOwn: number) {
  teamObject.addGames();
  teamObject.addGoalsFavor(goalsFavor);
  teamObject.addGoalsOwn(goalsOwn);
  teamObject.resultGoalsBalance();
  teamObject.resultEfficiency();
}

function addFunctionsVictory(teamObject: ILeaderBoard, goalsFavor: number, goalsOwn: number) {
  teamObject.addPointsVictory();
  teamObject.addTotalVictories();

  addFunctions(teamObject, goalsFavor, goalsOwn); // Adicionando as propriedades iguais
}

function addFunctionsLosses(teamObject: ILeaderBoard, goalsFavor: number, goalsOwn: number) {
  teamObject.addTotalLosses();

  addFunctions(teamObject, goalsFavor, goalsOwn); // Adicionando as propriedades iguais
}

function addFunctionsDraw(
  homeObject: ILeaderBoard,
  match: IMachComplete,
) {
  homeObject.addPointsDraw();
  homeObject.addTotalDraws();
  addFunctions(homeObject, match.homeTeamGoals, match.awayTeamGoals); // Adicionando - teamHome
}

function homeVictory(arrayMatches: ILeaderBoard[], match: IMachComplete) {
  const objectHome = arrayMatches.filter((team) => match[homeTeam].teamName === team.name)[0];
  addFunctionsVictory(objectHome, match[`${homeTeam}Goals`], match[`${awayTeam}Goals`]); // Adicinando resultados
}

function awayVictory(arrayMatches: ILeaderBoard[], match: IMachComplete) {
  const objectHome = arrayMatches.filter((team) => match[homeTeam].teamName === team.name)[0];
  addFunctionsLosses(objectHome, match[`${homeTeam}Goals`], match[`${awayTeam}Goals`]); // Adicinando resultados
}

function gameDraw(arrayMatches: ILeaderBoard[], match: IMachComplete) {
  const objectHome = arrayMatches.filter((team) => match[homeTeam].teamName === team.name)[0];
  addFunctionsDraw(objectHome, match); // Adicinando resultados
}

export default async function routeSelectedAway(matchResult : IMachComplete[]) {
  const arrayMatches: ILeaderBoard[] = [];
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
  return sortResult(arrayMatches);
}
