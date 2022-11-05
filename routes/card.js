const router = require('express').Router();
const { getCards, deleteCardById, createCard } = require('../controllers/card');

//router.get('/cards', getCards);
//router.delete('/cards/:cardId', deleteCardById);
router.post('/cards', createCard);

module.exports = router;