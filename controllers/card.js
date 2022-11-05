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

module.exports.deleteCardById = (req, res) => {
  console.log(req.params)
  const { cardId } = req.params;
  console.log(cardId)
  Card.findByIdAndRemove(cardId)
    .then(card => {
      console.log({ data: card })
      res.send({ data: card })
      }
    )
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

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

module.exports.likeCard = (req, res) => {
  console.log("likaem");
  const { cardId } = req.params;
  const id = req.user._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: id } }, { new: true })
    .then(card => {
      res.send({ data: card })
      })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  console.log("dislikaem");
  const { cardId } = req.params;
  const id = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .then(card => {
      res.send({ data: card })
      })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};