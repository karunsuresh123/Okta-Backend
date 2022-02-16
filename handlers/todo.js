const todo = require('../models/todo');
const modelTodo = require('../models/todo');
const Todo = require('../models/todo');
const mongoose = require('mongoose');

exports.getAll = async (req, res) => {
  try {
    const todos = await modelTodo.find();
    console.log(JSON.stringify(todos));
    return res.json(todos);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

exports.getOne = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === undefined) {
      return res.status(422).json({ message: 'Id Parameter missing' });
    }

    const todo = await modelTodo.findOne({ _id: id });

    if (!todo) {
      return res.status(404).json({ message: 'Data not found' });
    }
    return res.json(todo);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

exports.create = async (req, res) => {
  const text = req.body.text;
  const daytime = req.body.daytime;
  const reminder = req.body.reminder;

  try {
    if (text === undefined || daytime === undefined || reminder === undefined) {
      return res.status(422).json({ message: 'Incomplete Parameters' });
    }

    const todo = await modelTodo.create({ text, daytime, reminder });
    console.log("RETURNED..: ",todo)

    return res.status(201).json(todo);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("IDDD: ",id)
    const Objid = mongoose.Types.ObjectId(id);
    const text = req.body.text;
    const daytime = req.body.daytime;
    const reminder = req.body.reminder;

    if (text === undefined || daytime === undefined || reminder === undefined) {
      return res.status(422).json({ message: 'Incomplete Parameter' });
    }

    const todo = await modelTodo.updateOne(
      {
        _id: Objid
      }, 
      {
        //id,
        text,
        daytime,
        reminder
      });

    if (todo.nModified === 0) {
      return res.status(404).json({ message: 'Data not found.' });
    }

    return res.json({ message: 'Seccess.' });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

exports.delete = async (req, res) => {
  //const { id } = req.params;
  const id = req.params.id;
  console.log("ID  :  ",id);

  try {
    const todo = await modelTodo.deleteOne({ _id: id });

    if (todo.deletedCount === 0) {
      return res.status(404).json({ message: 'Data not found.' })
    }

    return res.json({ message: 'Success' });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}