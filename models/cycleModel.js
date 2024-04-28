const mongoose = require('mongoose');
const { type } = require('os');

const db_link = 'mongodb+srv://b22cs010:8D1dOHqceYvHZgxN@cluster0.1genmqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(db_link)
    .then(() => {
        console.log('db connected');
    })
    .catch((err) => {
        console.log(err);
    });

const cycleSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    hostelLane: {
        type: String,
        required: true,
        maxlength: [1, 'Enter only hostelLane as Y/G/O/B/I'],
    },
    mobileNo: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default: false
    }
});

const cycleModel = mongoose.model('cycle', cycleSchema);

module.exports = cycleModel;
