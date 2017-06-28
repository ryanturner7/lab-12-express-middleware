'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Shark = require('../model/shark.js');
const sharkRouter = module.exports = new Router();

sharkRouter.post('/api/sharks', jsonParser, (req, res, next) => {
  new Shark(req.body)
  .save()
  .then(shark => res.json(shark))
  .catch(next);
});

sharkRouter.get('/api/sharks/:id', (req, res, next) => {
  Shark.findById(req.params.id)
  .then(shark => res.json(shark))
  .catch(next);
});

sharkRouter.put('/api/sharks/:id', jsonParser, (req, res, next) => {

  let options = {
    runValidaters: true,
    new: true,
  };
  Shark.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(shark => res.json(shark))
  .catch(next);
});


sharkRouter.delete('/api/sharks/:id', (req, res, next) => {
  Shark.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
