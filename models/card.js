const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./user');

const cardSchema = new mongoose.Schema({
  versionKey: false,
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'userSchema',
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'userSchema',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model('card', cardSchema);