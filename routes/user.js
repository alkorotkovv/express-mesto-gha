const router = require('express').Router();
const {
  getMe,
  getUsers,
  getUserById,
  updateMeInfo,
  updateMeAvatar,
} = require('../controllers/user');

router.get('/users/me', getMe);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.patch('/users/me', updateMeInfo);
router.patch('/users/me/avatar', updateMeAvatar);

module.exports = router;
