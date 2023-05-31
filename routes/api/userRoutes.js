const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userRoutes');

//  /api/courses
router.route('/')
    .get(getUsers)
    .post(createNewUser)

router.router('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)
module.exports = router;