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
  });
});
