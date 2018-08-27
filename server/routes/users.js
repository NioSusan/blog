const router = require('express').Router();
const {login, signup} = require('../controllers/user');

router.post('/users/signin', login);
router.post('/users/signup', signup);
// router.get('/', isLogin, authUser, getUsers);
// router.get('/:userId', isLogin, authUser, getUser);
// router.put('/:userId', isLogin, authUser, updateUser);
// router.patch('/:userId', isLogin, authAdmin, updateUserRole);
// router.delete('/:userId', isLogin, authAdmin, deleteUser);

module.exports = router;
