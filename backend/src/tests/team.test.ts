import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import mocks from './mocks/users.mock'; // importando mocks
import { app } from '../app';
import teamsModel from '../database/models/teamsModel'; // importando model
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes BackEnd', () => {
  const teams = [
      {
        id: 1,
        teamName: 'Avaí/Kindermann'
      },
      {
        id: 2,
        teamName: "Bahia"
      },
      {
        id: 3,
        teamName: "Botafogo"
      }
    ]
  describe('Testando a Rota - /teams', () => {
    afterEach(() => sinon.restore());
  
    it('Verifica lista completa de times', async () => {
      sinon.stub(teamsModel, 'findAll').resolves(teams as any);
      const res = await chai.request(app).get('/teams');

      expect(res.status).to.be.equal(200);
      expect(res.body[0].teamName).to.be.equal('Avaí/Kindermann');
      expect(res.body[1].teamName).to.be.equal('Bahia');
      expect(res.body[2].teamName).to.be.equal('Botafogo');
      expect(res.body).to.be.an('array');
    });
  
    it('Verifica lista completa de times(caso erro)', async () => {
      sinon.stub(teamsModel, 'findAll').resolves(null as any);
      const res = await chai.request(app).get('/teams');

      expect(res.status).to.be.equal(401);
      expect(res.text).to.be.equal('{"message":"Teams not found"}');
    });

    it('Verifica busca de times Id', async () => {
      sinon.stub(teamsModel, 'findOne').resolves(teams[0] as any);
      const res = await chai.request(app).get('/teams/1');

      expect(res.status).to.be.equal(200);
      expect(res.body.teamName).to.be.equal('Avaí/Kindermann');
    });

    it('Verifica busca de times Id(caso erro)', async () => {
      sinon.stub(teamsModel, 'findOne').resolves(null as any);
      const res = await chai.request(app).get('/teams/10');

      expect(res.status).to.be.equal(401);
      expect(res.text).to.be.equal('{"message":"Team not found"}');
    });
  });
});
