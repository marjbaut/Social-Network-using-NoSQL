const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createAt:{
            type: Date,
            get: (date) => timeSince(date),
        },
        userName: 
            {
              type: Schema.Types.ObjectId,
              ref: 'user',
            },

        reactions:[Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
// Create a virtual called reactionCount that retrieves the
//  length of the thought's reactions array field on query.
thoughtSchema
.virtual('reactionCount') 
.get(function(){
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
