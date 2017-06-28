'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const Shark = require('../model/shark.js');
const server = require('../lib/server.js');

let tempShark;
const API_URL = process.env.API_URL;

describe('Testing shark router.', () => {
  before(server.start);
  after(server.stop);

  describe('Testing POST /api/sharks', () => {
    after(() => Shark.remove({}));

    let data = {
      type: 'Porbeagle',
      length: 12,
      weight: 298,
      toothCount: 50,
    };

    it('Should respond with a shark and a 200 status.', () => {
      return superagent.post(`${API_URL}/api/sharks`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.type).toEqual(data.type);
        expect(res.body.length).toEqual(data.length);
        expect(res.body.weight).toEqual(data.weight);
        expect(res.body.toothCount).toEqual(data.toothCount);
      });
    });
    it('Should return with a 400 status.', () => {
      return superagent.post(`${API_URL}/api/sharks`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('Should respond with a 400 status.', () => {
      return superagent.post(`${API_URL}/api/sharks`)
      .send({type: 'Porbeagle', length: '12', weight: '298'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('Should respond with a 400 status.', () => {
      return superagent.post(`${API_URL}/api/sharks`)
      .send({length: '12', weight: '298', toothCount: '50'})
      .catch(res => {
        expect(res.status).toEqual(400);

      });
    });
    it('Should respond with a 400 status.', () => {
      return superagent.post(`${API_URL}/api/sharks`)
      .send({type: 'Porbeagle '})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 409', () => {
      return superagent.post(`${API_URL}/api/sharks`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });
  describe('Testing GET /api/sharks/:id', () => {
    var tempShark;
    afterEach(() => Shark.remove({}));
    beforeEach(() => {
      return new Shark({
        type: 'Porbeagle',
        length: '12',
        weight: '298',
        toothCount: '50',
      })
      .save()
      .then(shark => {
        tempShark = shark;
      });
    });
    it('Should respond with an updated shark and a 200 status.', () => {
      return superagent.put(`${API_URL}/api/sharks/${tempShark._id}`)
      .send({type: 'Great White'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempShark._id);
        expect(res.body.type).toEqual('Great White');
        expect(res.body.length).toEqual(12);
        expect(res.body.weight).toEqual(298);
        expect(res.body.toothCount).toEqual(50);
      });
    });
    it('Should respond with a 400 status with an invalid body.', () => {
      return superagent.put(`${API_URL}/api/sharks/${tempShark._id}`)
      .send({toothCount: '60'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('Should respond with a 404 status with an invalid ID.', () => {
      superagent.get(`${API_URL}/api/sharks/4962e0da888be66a146b69d6`)
      .send({toothCount: 100})
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
    describe('testing DELETE /api/sharks/:id', () => {
      afterEach(() => Shark.remove({}));
      beforeEach(() => {
        return new Shark({
          type: 'Wobbegong',
          length: 4,
          weight: 10,
          toothCount: 30,
        })
       .save()
       .then(shark => {
         tempShark = shark;
       });
      });
      it('Should delete a shark and return a 204 status with a valid ID.', () => {
        return superagent.delete(`${API_URL}/api/sharks/${tempShark._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
      });
      it('Should return a 404 status with an invalid ID', () => {
        return superagent.delete(`${API_URL}/api/sharks/4962e0da888be66a146b69d6`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
  });
});
