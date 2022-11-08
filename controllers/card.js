const { constants } = require('http2');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const cardObject = {
    name,
    link,
    owner: req.user._id,
  };
  Card.create(cardObject)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.name}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}` });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с таким id не найдена' });
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.name}` });
      } else if (err.name === 'ReferenceError') {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: `Карточки с таким id не существует: ${err.name}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}` });
      }
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с таким id не найдена' });
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.name}` });
      } else if (err.name === 'ReferenceError') {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: `Карточки с таким id не существует: ${err.name}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}` });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с таким id не найдена' });
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.name}` });
      } else if (err.name === 'ReferenceError') {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: `Карточки с таким id не существует: ${err.name}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.name}` });
      }
    });
};
