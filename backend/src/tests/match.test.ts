import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import matchesModel from '../database/models/matchesModel'; // importando model
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes BackEnd', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjc0OTI1MDIwLCJleHAiOjE2NzQ5MzU4MjB9._2QSETi5uAjvBq5STbQ_ZvtM3DyRl4YuBxhwocUlJkM'

  const matches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
      }
  },
  {
    "id": 3,
    "homeTeamId": 4,
    "homeTeamGoals": 3,
    "awayTeamId": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "teamName": "Napoli-SC"
    }
  },
  {
    "id": 47,
    "homeTeamId": 8,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 2,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Grêmio"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  },
  {
    "id": 48,
    "homeTeamId": 8,
    "homeTeamGoals": 1,
    "awayTeamId": 2,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Grêmio"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  }
  ]

  const newMatch = {
    "id": 49,
    "homeTeamId": 5,
    "homeTeamGoals": 1,
    "awayTeamId": 11,
    "awayTeamGoals": 1,
    "inProgress": true,
  }

  const updateMatch = {
    "id": 48,
    "homeTeamId": 8,
    "homeTeamGoals": 3,
    "awayTeamId": 2,
    "awayTeamGoals": 2,
    "inProgress": true,
  }

  describe('Testando a Rota - /matches', () => {
    afterEach(() => sinon.restore());
  
    it('Verifica lista completa de partidas', async () => {
      sinon.stub(matchesModel, 'findAll').resolves(matches as any);
      const res = await chai.request(app).get('/matches');

      expect(res.status).to.be.equal(200);
      matches.forEach((match, index) => {
        expect(res.body[index].homeTeamId).to.be.equal(match.homeTeamId);
        expect(res.body[index].awayTeamId).to.be.equal(match.awayTeamId);
      })
      expect(res.body).to.be.an('array');
    });
  
    it('Verifica lista completa de partidas(caso erro)', async () => {
      sinon.stub(matchesModel, 'findAll').resolves(null as any);
      const res = await chai.request(app).get('/matches');

      expect(res.status).to.be.equal(401);
      expect(res.text).to.be.equal('{"message":"Matches not found"}');
    });
    
    // Importante:
      // .send(usado para json)
      // .query(usado para query)
      // https://www.chaijs.com/plugins/chai-http/

    it('Verifica lista completa de partidas - inProgress=true', async () => {
      const filterMatches = matches.filter((match) => match.inProgress === true); // seleciona apenas os jogos inProgress: true
      sinon.stub(matchesModel, 'findAll').resolves( filterMatches as any); 
      const res = await chai.request(app).get('/matches').query({ inProgress: 'true' } );

      expect(res.status).to.be.equal(200);
      filterMatches.forEach((match, index) => {
        expect(res.body[index].homeTeamId).to.be.equal(match.homeTeamId);
        expect(res.body[index].awayTeamId).to.be.equal(match.awayTeamId);
      })
      expect(res.body).to.be.an('array');
    });

    it('Verifica lista completa de partidas - inProgress=False', async () => {
      const filterMatches = matches.filter((match) => match.inProgress === false); // seleciona apenas os jogos inProgress: true
      sinon.stub(matchesModel, 'findAll').resolves( filterMatches as any); 
      const res = await chai.request(app).get('/matches').query({ inProgress: 'false' } );

      expect(res.status).to.be.equal(200);
      filterMatches.forEach((match, index) => {
        expect(res.body[index].homeTeamId).to.be.equal(match.homeTeamId);
        expect(res.body[index].awayTeamId).to.be.equal(match.awayTeamId);
      })
      expect(res.body).to.be.an('array');
    });

    it('Verifica adicina nova Macth', async () => {
      
      sinon.stub(matchesModel, 'create').resolves( newMatch as any); 
      const res = await chai.request(app).post('/matches').set('Authorization', token).send(
        { 
          homeTeamId: 5,
          awayTeamId: 11,
          homeTeamGoals: 1,
          awayTeamGoals: 1
       } 
      );
      expect(res.status).to.be.equal(201);
      expect(res.body.homeTeamId).to.be.equal(5);
      expect(res.body.awayTeamId).to.be.equal(11);
      expect(res.body.homeTeamGoals).to.be.equal(1);
      expect(res.body.awayTeamGoals).to.be.equal(1);
    });

    it('Verifica Update - Match', async () => {
      sinon.stub(matchesModel, 'update').resolves( null as any); 
      const res = await chai.request(app).patch('/matches/:48/finish'); // passando o parametro(id)

      expect(res.status).to.be.equal(200);
      expect(res.text).to.be.equal('{"message":"Finished"}');
    });

    it('Verifica Update - Match - Goals', async () => {
      sinon.stub(matchesModel, 'update').resolves( updateMatch as any); 
      const res = await chai.request(app).patch('/matches/:48').send({homeTeamGoals: 3, awayTeamGoals: 2}); // passando o parametro(id)

      expect(res.status).to.be.equal(200);
      expect(res.body.homeTeamGoals).to.be.equal(3);
      expect(res.body.awayTeamGoals).to.be.equal(2);
    });
  });
});
