const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;

const model = new Schema({
  id: {
    type: String,
  },
  text: {
    type: String,
    required: true
  },
  daytime: {
    type: String,
    required: true
  },
  reminder: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('todos', model);
