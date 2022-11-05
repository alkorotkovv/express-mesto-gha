const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  console.log("получаем юзеров");
  User.find({})
    .then(users => {
      console.log({ data: users })
      res.send({ data: users })
      }
    )
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  console.log(req.params)
  const { id } = req.params;
  console.log(id)
  User.findById(id)
    .then(user => {
      console.log({ data: user })
      res.send({ data: user })
      }
    )
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => {
      res.send({ data: user })
      })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateMeInfo = (req, res) => {
  console.log(req.body);
  console.log(req.user);
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about })
    .then(user => {
      res.send({ data: user })
      })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateMeAvatar = (req, res) => {
  console.log(req.body);
  console.log(req.user);
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar })
    .then(user => {
      res.send({ data: user })
      })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};