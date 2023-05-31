const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    addFriend,
    removeFriend
} = require('../../controllers/userRoutes');

//  /api/courses
router.route('/')
    .get(getThought)
    .post(createNewThought)

router.router('/:userId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
router.route('/:thoughtId/reactions')
    .post(reactions)
    .delete(removeReactions)
module.exports = router;