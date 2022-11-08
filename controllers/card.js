const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  //console.log("получаем карточки");
  Card.find({})
    .then(cards => {
      //console.log({ data: cards })
      res.send({ data: cards })
    })
    .catch(() => res.status(500).send({ message: `Произошла ошибка: ${err}`}));
};

module.exports.deleteCardById = (req, res) => {
  //console.log(req.params)
  const { cardId } = req.params;
  //console.log(cardId)
  Card.findByIdAndRemove(cardId)
    .then(card => {
      //console.log({ data: card })
      if (card)
        res.send({ data: card })
      else
      res.status(404).send({ message: `Карточка с таким id не найдена: ${err}`})
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  //console.log("создаем");
  const { name, link } = req.body;
  const cardObject = {
    name: name,
    link: link,
    owner: req.user._id
  }
  //console.log(cardObject);
  Card.create(cardObject)
    .then(card => {
      res.send({ data: card })
    })
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(400).send({ message: `Переданы некорректные данные: ${err}`})
      else
        res.status(500).send({ message: `Произошла ошибка: ${err}`})
    });
};

module.exports.likeCard = (req, res) => {
  //console.log("likaem");
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => {
      if (card)
        res.send({ data: card })
      else
        res.status(404).send({ message: `Карточка с таким id не найдена: ${err}`})
    })
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(400).send({ message: `Переданы некорректные данные: ${err}`})
      else
        res.status(500).send({ message: `Произошла ошибка: ${err}`})
    });
};

module.exports.dislikeCard = (req, res) => {
  //console.log("dislikaem");
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => {
      if (card)
        res.send({ data: card })
      else
        res.status(404).send({ message: `Карточка с таким id не найдена: ${err}`})
    })
    .catch((err) => {
      //console.log(err.name);
      if ((err.name === "CastError") || (err.name === "ValidationError"))
        res.status(400).send({ message: `Переданы некорректные данные: ${err}`})
      else
        res.status(500).send({ message: `Произошла ошибка: ${err}`})
    });
};