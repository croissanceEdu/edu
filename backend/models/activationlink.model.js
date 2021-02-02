const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activationlinkSchema = new Schema({
  name: String,
  email: String,
  token:String
}, {
  timestamps: true,
});

const ActivationLink = mongoose.model('ActivationLink', activationlinkSchema);

module.exports = ActivationLink;