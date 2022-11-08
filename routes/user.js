const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateMeInfo,
  updateMeAvatar,
} = require('../controllers/user');

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.patch('/users/me', updateMeInfo);
router.patch('/users/me/avatar', updateMeAvatar);

module.exports = router;
