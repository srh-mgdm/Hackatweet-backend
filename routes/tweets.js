var express = require('express');
var router = express.Router();

const User = require('../models/users');
const Tweet = require('../models/tweets');
// const Trend = require('../models/trends');
const { checkBody } = require('../modules/checkBody');
const moment = require('moment');

const uid2 = require('uid2');
const bcrypt = require('bcrypt');


router.get('/',(req, res) => {
    Tweet.find()
    .populate('users')
    .then(tweets=>res.json({result:true, tweets:tweets}))
})
router.post('/addTweet', (req, res) => {
    const { userId, tweetMessages, hashtags } = req.body;

    const newTweet = new Tweet({
        users: [userId],
        tweetMessages: tweetMessages,
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
