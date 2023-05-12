import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/Team.model';
import { Response } from 'superagent';
import { getAllTeams } from '../mock/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('test /teams', () => {

    let chaiHttpResponse: Response;

    afterEach(() => {
        Sinon.restore();
    });

    describe('GET teams', () => {
        it('Should return all teams', async () => {
            Sinon.stub(TeamModel, 'findAll').resolves(getAllTeams as TeamModel[]); 

            const { status, body} = await chai.request(app).get('/teams')

            expect(status).to.be.equal(200);
            expect(body).to.be.deep.equal(getAllTeams);
        })
    })
});