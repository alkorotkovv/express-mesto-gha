const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
      //console.log({ data: users })
      res.send({ data: users })
      }
    )
    .catch(() => res.status(500).send({ message: `Произошла ошибка: ${err}`}));
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
        res.status(404).send({ message: `Пользователь с таким id не найден: ${err}`})
      }
    )
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(400).send({ message: `Переданы некорректные данные: ${err}`})
      else
        res.status(500).send({ message: `Произошла ошибка: ${err}`})
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
        res.status(400).send({ message: `Переданы некорректные данные: ${err}`})
      else
        res.status(500).send({ message: `Произошла ошибка: ${err}`})
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
        res.status(404).send({ message: `Пользователь с таким id не найден: ${err}`})
    })
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(400).send({ message: `Переданы некорректные данные: ${err}`})
      else
        res.status(500).send({ message: `Произошла ошибка: ${err}`})
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
        res.status(404).send({ message: `Пользователь с таким id не найден: ${err}`})
    })
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(400).send({ message: `Переданы некорректные данные: ${err}`})
      else
        res.status(500).send({ message: `Произошла ошибка: ${err}`})
    });
};