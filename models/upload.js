'use strict'

const mongoose = require('mongoose');

const schema = mongoose.Schema;

const uploadDocSchema = mongoose.schema({
    fileHash: Object,
    DocumentType: String,
    name: String,
    seatNo: String,
    usertype: String,
    created_at: String,
    modified_at: String
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://nareshtej:123@ds233320.mlab.com:33320/docman', {useMongoClient: true});

module.exports = mongoose.model('uploads', uploadDocSchema);
