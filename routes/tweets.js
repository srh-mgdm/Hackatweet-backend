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
    const { userId, tweetMessage, hashtags } = req.body;

    const newTweet = new Tweet({
        users: [userId],
        tweetMessage: tweetMessage,
        createdAt: moment().toISOString(),
        likesCounter: 0,
        isLiked: false,
        hashtags: hashtags,
    });

    newTweet.save()
    .then(savedTweet => {
        // with populate we receive the information of user
        return Tweet.findById(savedTweet._id).populate('users');
    })
    .then(tweetWithUser => {
        const timeAgo = moment(tweetWithUser.createdAt).fromNow();
        res.status(201).json({ message: 'Tweet added successfully!', tweet: tweetWithUser, timeAgo: timeAgo });
    })
   

});
module.exports = router;
