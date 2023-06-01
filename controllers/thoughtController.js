// const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');
module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET a single thoguht by its _id an
    async getSingleThought(req, res) {
        try {
            const thought = await Thought
                .findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // createNewthoguht
    async createNewThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // updatethoguht
    async updateThought(req, res) {
        try {
            const thought = await Thought
                .findOneAndUpdate(
                    { _id: req.params.thoughtId }
                );
            if (!thought) {
                return res.status(404).json({ message: 'no user iwht that id' })
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete thoguht
    async deleteThought(req, res) {
        try {
            const thought = await Thought
                .findOneAndDelete(
                    { _id: req.params.thoughtId },
                );
            if (!thought) {
                return res.status(404).json({ message: 'no user with that id' })
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
// /api/thoughts/:thoughtId/reactions
async createReactions(req, res) {
    try {
      const reaction = await Thought.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $addToSet: { reactions: reaction._id } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'reaction created, but found no thought with that ID' });
      }

      res.json('Created thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// remo
async removeReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndDelete(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $addToSet: { reactions: reaction._id } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'reaction removed, but found no thought with that ID' });
      };

      res.json('removed reaction 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
