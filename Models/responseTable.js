const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  phoneNumber: [{
    type: String,
    unique:false
  }],
  email: [{
    type: String,
    unique:false
  }],
  linkedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Response',
  },
  linkPrecedence: {
    type: String,
    enum: ['primary', 'secondary'],
  },
}, {
  timestamps: true,
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;