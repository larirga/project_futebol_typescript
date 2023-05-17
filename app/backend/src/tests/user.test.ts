import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import UserService from '../services/user.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('test /login', () => {

    let chaiHttpResponse: Response;

    afterEach(() => {
        Sinon.restore();
    });

    describe('POST user', () => {
        it('Should return an token', async () => {
            Sinon.stub(UserService, 'login').resolves('token'); 

            chaiHttpResponse = await chai.request(app)
            .post('/login')
            .send({
              email: 'test@test.com',
              password: '123456',
            });

            expect(chaiHttpResponse.status).to.be.equal(200);
            expect(chaiHttpResponse.body).to.be.deep.equal({token: 'token'})
        })
        it('should return 400 without params', async () => {
            chaiHttpResponse = await chai.request(app)
            .post('/login')
            .send({
              email: 'test@test.com',
            });

            expect(chaiHttpResponse.status).to.be.equal(400);
        })
        it('should return 401 with incorrect params', async () => {
            chaiHttpResponse = await chai.request(app)
            .post('/login')
            .send({
              email: '@test.com',
              password: '123456',
            });

            expect(chaiHttpResponse.status).to.be.equal(401);
        })
    })
});