const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReactions,
    removeReaction
} = require('../../controllers/thoughtController');

//  /api/courses
router.route('/')
    .get(getThoughts)
    .post(createNewThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
    // /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(createReactions)
    .delete(removeReaction);
module.exports = router;