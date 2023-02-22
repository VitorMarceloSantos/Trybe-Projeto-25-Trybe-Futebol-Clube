import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import { leaderHomeMock } from './mocks/leaderHome.mock';
// import matchesService from '../services/matchesService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes BackEnd', () => {
  describe('Testando a Rota - /leaderboard/home', () => {
    afterEach(() => sinon.restore());
  
    it('Verifica lista home', async () => {
      // sinon.stub(matchesService, 'searchMatchesProgress').resolves(leaderHomeMock as any);
      const res = await chai.request(app).get('/leaderboard/home');

      expect(res.status).to.be.equal(200);
      expect(res.body[0].name).to.be.equal('Santos');
      expect(res.body[1].name).to.be.equal('Corinthians');
      expect(res.body[2].name).to.be.equal('Palmeiras');
      expect(res.body).to.be.an('array');
    });

    it('Verifica lista away', async () => {
      // sinon.stub(matchesService, 'searchMatchesProgress').resolves(leaderHomeMock as any);
      const res = await chai.request(app).get('/leaderboard/away');

      expect(res.status).to.be.equal(200);
      expect(res.body[0].name).to.be.equal('Palmeiras');
      expect(res.body[1].name).to.be.equal('Corinthians');
      expect(res.body[2].name).to.be.equal('Internacional');
      expect(res.body).to.be.an('array');
    });

    it('Verifica lista completa', async () => {
      // sinon.stub(matchesService, 'searchMatchesProgress').resolves(leaderHomeMock as any);
      const res = await chai.request(app).get('/leaderboard');

      expect(res.status).to.be.equal(200);
      expect(res.body[0].name).to.be.equal('Corinthians');
      expect(res.body[1].name).to.be.equal('Palmeiras');
      expect(res.body[2].name).to.be.equal('Santos');
      expect(res.body).to.be.an('array');
    });
  });
});
