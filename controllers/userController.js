// const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const user = await User.find();
            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET a single user by its _id and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User
                .findOne({ _id: req.params.userId })
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // createNewUser
    async createNewUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // updateUser
    async updateUser(req, res) {
        try {
            const user = await User
                .findOneAndUpdate(
                    { _id: req.params.userId }
                );
            if (!user) {
                return res.status(404).json({ message: 'no user iwht that id' })
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // deleteUser
    async deleteUser(req, res) {
        try {
            const user = await User
                .findOneAndDelete(
                    { _id: req.params.userId },
                );
            if (!user) {
                return res.status(404).json({ message: 'no user with that id' })
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
// addFriend,
// api/users/:userId/friends/:friend
async addFriend(req, res) {
    try {
      const friend = await User.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { friends: friend._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Friend created, but found no user with that ID' });
      }

      res.json('Created added the friend 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// removeFriend
async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndDelete(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { friends: friend._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Friend removed, but found no user with that ID' });
      }

      res.json('removed friend 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}
