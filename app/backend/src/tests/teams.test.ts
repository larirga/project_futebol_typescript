import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/Team.model';
import { Response } from 'superagent';
import { getAllTeams, getOneTeam } from '../mock/teams.mock';
import TeamService from '../services/team.service';

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
        it('Should return one team', async () => {
            Sinon.stub(TeamModel, 'findByPk').resolves(getOneTeam as TeamModel);

            const { status, body} = await chai.request(app).get('/teams/1')

            expect(status).to.be.equal(200);
            expect(body).to.be.deep.equal(getOneTeam);
        })
        it('should return an error if it does not find team', async () => {
            Sinon.stub(TeamModel, 'findByPk').resolves();

            expect(await TeamService.getById(1)).to.be.be('There is no team with such id!')
        })
        it('should return all teams at service', async () => {
            Sinon.stub(TeamModel, 'findAll').resolves([]);
        
            expect(await TeamService.getAll()).to.be.deep.equal([]);
        })
        it('should return one team at service', async () => {
            Sinon.stub(TeamModel, 'findByPk').resolves(getOneTeam as TeamModel);
            const resultService = await TeamService.getById(1);
            expect(resultService).to.be.deep.eq(getOneTeam);
            expect(resultService).to.be.an('object');

        })
    })
});