const express = require('express');
const router = express.Router();

const todoHandler = require('../handlers/todo');

router.route('/')
  .get(todoHandler.getAll)
  .post(todoHandler.create);

router.route('/:id')
  .get(todoHandler.getOne)
  .put(todoHandler.update)
  .delete(todoHandler.delete);

module.exports = router;