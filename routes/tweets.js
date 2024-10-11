var express = require('express');
var router = express.Router();

const User = require('../models/users');
const Tweet = require('../models/tweets');
// const Trend = require('../models/trends');
const { checkBody } = require('../modules/checkBody');
const moment = require('moment');




router.get('/',(req, res) => {
    Tweet.find()
    .populate('users')
    .then(tweets=>res.json({result:true, tweets:tweets}))
})
router.post('/addTweet', (req, res) => {
    const { token, tweetMessage, hashtags } = req.body;
    console.log('Received data:', { token, tweetMessage, hashtags });

    User.findOne({ token })
        .then(user => {
            if (!user) {
                return res.json({ result: false, message: 'User not found' });
            }

            const newTweet = new Tweet({
                users: [user._id],
                tweetMessage: tweetMessage,
                createdAt: moment().toISOString(),
                likesCounter: 0,
                isLiked: false,
                hashtags: hashtags,
            });

            return newTweet.save();
        })
        .then(savedTweet => {
            return Tweet.findById(savedTweet._id).populate('users');
        })
        .then(tweetWithUser => {
            const timeAgo = moment(tweetWithUser.createdAt).fromNow();
            res.status(201).json({ message: 'Tweet added successfully!', tweet: tweetWithUser, timeAgo: timeAgo });
        })
        .catch(err => {
            console.error('Error adding tweet:', err);
            res.status(500).json({ result: false, message: 'Error adding tweet' });
        });
});
module.exports = router;
