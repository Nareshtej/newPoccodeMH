'use strict'
 
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userDetailsSchema = mongoose.Schema({
    
    nem_id : Object,
    privateKey : String,
    walletName : String,
    password : String,
    usertype : String,
    created_at : String
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://nareshtej:123@ds233320.mlab.com:33320/docman');

module.exports = mongoose.model('userdetails', userDetailsSchema);
