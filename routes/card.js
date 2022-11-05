const router = require('express').Router();
const { getCards, deleteCardById, createCard, likeCard, dislikeCard } = require('../controllers/card');

router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCardById);
router.patch('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);


module.exports = router;