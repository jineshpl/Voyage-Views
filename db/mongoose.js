'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://group:mark309@cluster0.zly4t.mongodb.net/test', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, () => console.log('MongoDB has connected successfully.'));

module.exports = { mongoose }