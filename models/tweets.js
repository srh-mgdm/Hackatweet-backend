const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    tweetMessage: String,
    createdAt: Date,
    likesCounter: Number,
    isLiked: Boolean,
    hashtags: String,
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;
