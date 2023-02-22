import ILeaderBoard from '../interfaces/leaderBoard';

// Ordenar arrayMatches de acordo com os critérios de desempate
export default function sortResult(arrayMatches: ILeaderBoard[]) {
  return arrayMatches.sort((a, b) => {
    if (b.totalPoints === a.totalPoints) { // verifica se os times possuem a mesma pontuação -> 1° criterio
      if (b.totalVictories === a.totalVictories) { // maior numero de vitorias -> 2° criterio
        if (b.goalsBalance === a.goalsBalance) { // verifica saldo de gols -> 3° criterio
          return b.goalsFavor - a.goalsFavor; // retorna quem fez mais gols -> 4° criterio
        } return b.goalsBalance - a.goalsBalance; // retorna quem tem mais gols
      } return b.totalVictories - a.totalVictories; // retorna quem tem mais vitorias
    }
    return b.totalPoints - a.totalPoints; // retorna quem tem mais pontos
  });
}
