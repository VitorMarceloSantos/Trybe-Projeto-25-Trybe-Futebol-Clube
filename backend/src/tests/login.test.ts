import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import mocks from './mocks/users.mock'; // importando mocks
import { app } from '../app';
import usersModel from '../database/models/usersModel'; // importando model
import * as jwt from 'jsonwebtoken'; // verificar token
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes BackEnd', () => {
  const userCorrect = {
    dataValues: {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    }
  }
  describe('Testando a Rota - /login', () => {
    afterEach(() => sinon.restore());
  
    it('Verifica usuário correto', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
      expect(res.status).to.be.equal(200);
    });
  
    it('Verifica usuário Incorreto - Email(Faltando)', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).post('/login').send({ password: 'secret_admi' });
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Verifica usuário Incorreto - Senha(Faltando)', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Verifica usuário Incorreto - Email(escrita incorreta)', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).post('/login').send({ email: 'email', password: 'secret_admi' });
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });

    it('Verifica usuário Incorreto - Senha(escrita incorreta)', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).post('/login').send({ email: 'email@email.com', password: 'sec' });
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  
    it('Verifica usuário Incorreto - Email', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).post('/login').send({ email: 'email@email.com', password: 'secret_admi' });
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  
    it('Verifica usuário Incorreto - Senha', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'senha_errada' });
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });

  describe('Testando a Rota - /login/validate', () => {
    // O token expira
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjc0OTI1MDIwLCJleHAiOjE2NzQ5MzU4MjB9._2QSETi5uAjvBq5STbQ_ZvtM3DyRl4YuBxhwocUlJkM'

    afterEach(() => sinon.restore());

    it('Verifica email Incorreto(token correto)', async () => {
      sinon.stub(usersModel, 'findOne').resolves(null as any);
      const res = await chai.request(app).get('/login/validate').set('Authorization', token).send({ email: 'email@incorreto.com'});

      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal({ role: 'User not found' });
    });

    it('Verifica token Faltando', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).get('/login/validate').set('Authorization', '');
      
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('Verifica token Correto', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).get('/login/validate').set('Authorization', token);

      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.property('role');
    });

    it('Verifica token Incorreto', async () => {
      sinon.stub(usersModel, 'findOne').resolves(userCorrect as any);
      const res = await chai.request(app).get('/login/validate').set('Authorization', '123456');
      
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });
  });
});


