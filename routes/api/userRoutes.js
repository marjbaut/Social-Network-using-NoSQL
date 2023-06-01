const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

//  /api/courses
router.route('/')
    .get(getUsers)
    .post(createNewUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

    // /api/users/:userId/friends/:friendId 
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);
    
module.exports = router;