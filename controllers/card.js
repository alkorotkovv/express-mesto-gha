const Card = require('../models/card');
const User = require('../models/user');

module.exports.getCards = (req, res) => {
  console.log("получаем карточки");
  Card.find({})
    .then(cards => {
      console.log({ data: cards })
      res.send({ data: cards })
      }
    )
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
/*
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
*/
module.exports.createCard = (req, res) => {
  console.log("создаем");
  const { name, link } = req.body;
  const id = req.user._id;
  const cardObject = {
    name: name,
    link: link,
    owner: id
  }
  console.log(cardObject);
  Card.create(cardObject)
    .then(card => {
      res.send({ data: card })
      })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};