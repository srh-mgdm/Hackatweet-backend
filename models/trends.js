const mongoose = require('mongoose');

const trendSchema = mongoose.Schema({
    nameHashtag: String,
    countHashtag: Number,
});

const Trend = mongoose.model('trends', trendSchema);

module.exports = Trend;
