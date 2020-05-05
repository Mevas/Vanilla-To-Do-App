const express = require('express');
const router = express.Router();

const { DB } = require('../database/index.js');
const db = new DB();

router.get('/api/todos', (req, res, next) => {
  const todos = db.findAll();
  res.send(todos);
});

router.get('/api/todos/:id', (req, res, next) => {
  const todo = db.findOne(req.params.id);
  res.send(todo);
});

router.post('/api/todos', (req, res, next) => {
  const todo = db.createOne(req.body.task);
  res.send(todo);
});

router.put('/api/todos/:id', (req, res, next) => {
  const todo = db.editOne(req.params.id, req.body.task, req.body.done);
  res.send(todo);
});

router.delete('/api/todos/:id', (req, res, next) => {
  db.deleteOne(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
