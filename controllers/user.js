const {constants} = require('http2');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
      //console.log({ data: users })
      res.send({ data: users })
      }
    )
    .catch(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}`}));
};

module.exports.getUserById = (req, res) => {
  //console.log(req.params)
  const { id } = req.params;
  //console.log(id)
  User.findById(id)
    .then(user => {
      //console.log({ data: user })
      if (user)
        res.send({ data: user })
      else
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: `Пользователь с таким id не найден: ${err.name}`})
      }
    )
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.name}`})
      else if (err.name === "ReferenceError")
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: `Пользователя с таким id не существует: ${err.name}`})
      else
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}`})
  });
};

module.exports.createUser = (req, res) => {
  //console.log(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => {
      res.send({ data: user })
      })
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.name}`})
      else
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}`})
  });
};

module.exports.updateMeInfo = (req, res) => {
  //console.log(req.body);
  //console.log(req.user);
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about })
    .then(user => {
      if (user)
        res.send({ data: user })
      else
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: `Пользователь с таким id не найден: ${err.name}`})
    })
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.name}`})
      else
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}`})
    });
};

module.exports.updateMeAvatar = (req, res) => {
  //console.log(req.body);
  //console.log(req.user);
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar })
    .then(user => {
      if (user)
        res.send({ data: user })
      else
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: `Пользователь с таким id не найден: ${err.name}`})
    })
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.name}`})
      else
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}`})
    });
};