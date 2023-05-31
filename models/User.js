const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [
            {
                type: Schema.types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
// Create a virtual called friendCount that 
// retrieves the length of the user's friends array field on query.

userSchema
.virtual('friendsCount')
.get(function(){
    return this,friends.length;
});

const User = model('user', userSchema);

module.exports = User;
